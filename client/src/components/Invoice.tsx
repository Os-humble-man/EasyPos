import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import moment from "moment";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import logo from "@/assets/logopos.png";
import PaymentService, { Payment } from "@/services/PaymentService";

export default function InvoicePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [invoice, setInvoice] = useState<Payment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchInvoiceDetails = async (invoiceId: number) => {
    try {
      const response = await PaymentService.getPaymentById(invoiceId);
      if (response) {
        setInvoice(response);
      } else {
        setError("Facture non trouvée");
      }
    } catch (err) {
      console.error("Erreur lors de la récupération de la facture :", err);
      setError(
        "Une erreur s'est produite lors de la récupération de la facture."
      );
    } finally {
      setLoading(false);
    }
  };

   useEffect(() => {
    if (id) {
      const invoiceId = Number(id);
      if (!isNaN(invoiceId)) {
        fetchInvoiceDetails(invoiceId);
      } else {
        setError("ID de facture invalide");
        setLoading(false);
      }
    } else {
      setError("Aucun ID de facture fourni");
      setLoading(false);
    }
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Chargement de la facture...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Aucune donnée de facture disponible.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-4 print:py-0">
      <div className="mb-4 flex items-center justify-between print:hidden">
        <Button
          variant="outline"
          onClick={() => navigate("/dashboard")}
          className="gap-1 text-xs"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour
        </Button>
        <Button
          variant="outline"
          onClick={handlePrint}
          className="gap-1 text-xs"
        >
          <Printer className="h-4 w-4" />
          Imprimer
        </Button>
      </div>

      <Card className="mx-auto max-w-xs relative overflow-hidden print:p-2 print:max-w-none print:border-none">
        <div className="absolute inset-0 flex items-center justify-center opacity-20 print:opacity-10">
          <img src={logo} alt="" className="w-24 h-24 print:w-20 print:h-20" />
        </div>

        <CardHeader className="print:p-2">
          <div className="flex flex-col items-center justify-center space-y-2 md:flex-row md:space-y-0">
            <div className="z-10">
              <img
                src={logo}
                alt=""
                className="w-12 h-12 print:w-10 print:h-10"
              />
            </div>
            <div className="text-center text-xs z-10 print:text-xxs">
              <h2 className="font-bold">République démocratique du Congo</h2>
              <p>Province du Haut Katanga</p>
              <p>Secteur des BALAMBA</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 print:p-2">
          <div className="grid grid-cols-1 gap-4">
            <div className="text-right">
              <div className="space-y-1">
                <div className="flex justify-between">
                  <p className="text-xs font-medium print:text-xxs">
                    Quittance:
                  </p>
                  <p className="text-xs print:text-xxs">Nº {invoice?.id}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-xs print:text-xxs">Plaque:</p>
                  <p className="text-xs print:text-xxs">{invoice.noPlaque}</p>
                </div>
                {/* <div className="flex justify-between">
                  <p className="text-xs text-green-500 print:text-xxs">
                    REF : {invoice.reference}
                  </p>
                </div> */}
                <div className="flex justify-between">
                  <p className="text-xs print:text-xxs">REF : </p>
                  <p className="text-xs print:text-xxs text-green-500">
                    {invoice.reference}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Separator className="print:my-2" />

          <div>
            <div className="text-sm">
              <div className="grid grid-cols-2 py-3 font-medium text-xs print:py-1 print:text-xxs">
                <div>Dénomination</div>
                <div className="text-right">{invoice.tax?.name}</div>
              </div>
              <div className="grid grid-cols-2 py-2 font-medium text-xs print:py-1 print:text-xxs">
                <div>Montant</div>
                <div className="text-right">{invoice.amount} FC</div>
              </div>
              <div className="grid grid-cols-2 py-2 font-medium text-xs print:py-1 print:text-xxs">
                <div>Motif</div>
                <div className="text-right">{invoice.reason}</div>
              </div>
              <Separator className="print:my-2" />
            </div>
          </div>

          <div className="flex flex-col items-end space-y-1 text-sm print:text-xxs">
            <div className="flex w-full justify-between text-xs print:text-xxs">
              <p className="font-medium">Percepteur/trice:</p>
              <p>
                {invoice.agent?.name}{" "}
                {invoice.agent && (
                  <span className="capitalize">
                    {invoice.agent.last_name[0]}
                  </span>
                )}
                .
              </p>
            </div>
            <div className="flex w-full justify-between text-xs print:text-xxs">
              <p className="font-medium">
                Fait à Tshinsenda {invoice.location}
              </p>
              <p>{moment(invoice.payment_date).format("DD/MM/YY HH:mm")}</p>
            </div>
            <Separator className="w-full print:my-2" />
            <div className="flex w-full justify-between text-xs font-bold print:text-xxs">
              <p className=" my-3">Signature:</p>
            </div>
          </div>
        </CardContent>

        <CardFooter className="text-center text-xs text-muted-foreground print:p-2 print:text-xxs">
          <p>Merci pour votre paiement. Ceci est un reçu officiel.</p>
        </CardFooter>
      </Card>
    </div>
  );
}
