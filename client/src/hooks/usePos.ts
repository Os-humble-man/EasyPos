import { Pos, PosService } from "@/services/PosService";
import { useEffect, useState } from "react";

export const usePos = () => {
  const [pos, setPos] = useState<Pos[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPos = async () => {
      setLoading(true);
      try {
        const data = await PosService.getAllPos();
        setPos(data);
      } catch (error: Error | any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPos();
  }, []);

  return { pos, loading, error };
};
