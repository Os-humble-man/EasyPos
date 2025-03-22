import { useState, useEffect } from 'react';
import PaymentService from '../services/PaymentService';

const useTransaction = () => {
    const [transactionTotal, setTransactionTotal] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTransactionTotal = async (): Promise<void> => {
            try {
                const data = await PaymentService.getTransactionTotal();
                setTransactionTotal(data);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError("An error occurred while fetching total amount.");
                }
            }
        };

        fetchTransactionTotal();
    }, []);

    return { transactionTotal, error };
};

export default useTransaction;