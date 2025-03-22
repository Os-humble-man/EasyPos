import apiClient from "@/api/apiClient";
import { TotalAmountResponse } from "@/hooks/useFechTotal";


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

const PaymentService = {
  createPayment: async (payment: Payment): Promise<Payment> => {
    const response = await apiClient.post<Payment, Payment>("/payment", payment);
    return response.data;
  },

  getAllPayments: async (): Promise<Payment[]> => {
    const response = await apiClient.get<Payment[]>("/payments");
    return response.data;
  },

  getPaymentById: async (id: number): Promise<Payment> => {
    const response = await apiClient.get<Payment>(`/payment/${id}`);
    return response.data;
  },

  getPayTotal: async (): Promise<TotalAmountResponse> => {
    const response = await apiClient.get<TotalAmountResponse>("/payment/total");
    return response.data;
  },

  getTransactionTotal: async (): Promise<number> => {
    const response = await apiClient.get<{ total: number }>("/payment/total_transactions");
    return response.data.total;
  },

  updatePayment: async (payment: Payment): Promise<Payment> => {
    const response = await apiClient.put<Payment, Payment>("/payment", payment);
    return response.data;
  },

  deletePayment: async (id: number): Promise<void> => {
    await apiClient.delete(`/payment/${id}`);
  },
};

export default PaymentService;