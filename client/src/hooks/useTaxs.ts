import TaxService, { Tax } from "@/services/taxService";
import { useEffect, useState } from "react";

export const useTaxes = () => {
  const [taxes, setTaxes] = useState<Tax[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchTaxes = async () => {
      setLoading(true);
      try {
        const data = await TaxService.getAllTaxs();
        setTaxes(data);
      } catch (error: Error | any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTaxes();
  }, []);

  return { taxes, loading, error };
};
