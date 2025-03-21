import PaymentService from "@/services/PaymentService";
import { useEffect, useState } from "react";

interface Payment {
  id?: number;
  noPlaque?: string;
  amount?: number;
  tax_id?: string;
  reason?: string;
  agent_id?: number;
  tax?: {
    id: number;
    name: string;
  };
  agent?: {
    id: number;
    name: string;
    last_name: string;
  };
  location?: string;
  reference?: string;
  payment_date?: string;
}

export interface TotalAmountResponse {
  totalAmount: {
    totalAmount: number;
    percentageChange: number;
  };
}

export const usePayment = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  // const [totalTransaction, setTotalTransaction] = useState<number>(0);
  const [totalPer, setTotalPer] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPayment = async (): Promise<Payment[]> => {
    try {
      const data = await PaymentService.getAllPayments();
      return data;
    } catch (error: any) {
      setError(error.message || "An error occurred while fetching payments.");
      throw error;
    }
  };

  const fetchTotal = async (): Promise<TotalAmountResponse> => {
    try {
      const data = await PaymentService.getPayTotal();
      return data; // Assurez-vous que data est de type TotalAmountResponse
    } catch (error: any) {
      setError(
        error.message || "An error occurred while fetching total amount."
      );
      throw error;
    }
  };

  // const fetchTransactionTotal = async (): Promise<number> => {
  //   try {
  //     const data = await PaymentService.getTransactionTotal();
  //     return data;
  //   } catch (error: any) {
  //     setError(
  //       error.message || "An error occurred while fetching total transactions."
  //     );
  //     throw error;
  //   }
  // };

  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        const [paymentRes, amountRes] = await Promise.all([
          fetchPayment(),
          fetchTotal(),
        ]);

        setPayments(paymentRes);
        console.log(amountRes.totalAmount); // Vérifiez la structure de amountRes dans la console
        setTotalAmount(amountRes.totalAmount.totalAmount); // Accédez à la valeur correcte
        setTotalPer(amountRes.totalAmount.percentageChange);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentData();
  }, []);

  return {
    payments,
    totalAmount,
    totalPer,
    // totalTransaction,
    loading,
    error,
  };
};
