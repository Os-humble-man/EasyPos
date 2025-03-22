import { useState, useEffect } from 'react';
import PaymentService from '../services/PaymentService';

export interface TotalAmountResponse {
    totalAmount: number;
    percentageChange: number;
}

const useFetchTotal = () => {
    const [totalAmount, setTotalAmount] = useState<number | null>(null);
    const [stat, setStat] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchTotal = async () => {
            try {
                const data = await PaymentService.getPayTotal();
                setTotalAmount(data.totalAmount);
                setStat(data.percentageChange);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError("An error occurred while fetching total amount.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchTotal();
    }, []);

    return { totalAmount, stat, error, loading };
};

export default useFetchTotal;