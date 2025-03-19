import apiClient from "@/api/apiClient";

export interface Payment {
  id?: number;
  agent_id?: number;
  noPlaque?: number;
  amount?: number;
  tax_id?: number;
  pos_id?: number;
  reason?: string;
  reference: string;
  agent: {
    name: string;
    last_name: string;
  };
  location: string;
  payment_date: string;
  tax: {
    name: string;
  };
}

const PaymentService = {
  createPayment: async (payment: Payment): Promise<any> => {
    const response = await apiClient.post<Payment, Payment>(
      "/payment",
      payment
    );
    return response;
  },
  getAllPayments: async (): Promise<Payment[]> => {
    const response = await apiClient.get<Payment[]>("/payments");
    return response.data;
  },
  getPaymentById: async (id: number): Promise<Payment> => {
    const response = await apiClient.get<Payment>(`/payment/${id}`);
    return response.data;
  },
  updatePayment: async (payment: Payment): Promise<Payment> => {
    const response = await apiClient.put<Payment, Payment>(`/payment`, payment);
    return response.data;
  },
  deletePayment: async (id: number): Promise<Payment> => {
    const response = await apiClient.delete<Payment>(`/payment/${id}`);
    return response.data;
  },
};

export default PaymentService;
