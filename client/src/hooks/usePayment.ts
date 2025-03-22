import { useEffect, useState } from "react";
import PaymentService from "@/services/PaymentService";

export interface Payment {
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

export const useFetchPayments = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const data = await PaymentService.getAllPayments();
        setPayments(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError("An unknown error occurred while fetching payments.");
        } else {
          setError("An unknown error occurred while fetching payments.");
        }
        setError((error as Error).message || "An error occurred while fetching payments.");
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  return { payments, loading, error };
};
