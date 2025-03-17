"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Download, Printer } from "lucide-react";
import { useLocation } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useNavigate, useParams } from "react-router-dom";
import logo from "@/assets/logopos.png";

export default function InvoicePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation(); // Pour accéder aux données passées via navigate
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Utiliser les données passées via navigate
    const invoiceData = location.state || {
      noPlaque: "Nº 00AR-00",
      denomination: "Oscar Kanangila",
      montant: 50000,
      motif: "Paiement de la taxe",
    };

    const mockInvoice = {
      id: id,
      number: `INV-${id}`,
      date: "2025-03-10",
      dueDate: "2025-03-10",
      user: {
        name: "John Doe",
        email: "john@example.com",
        address: "123 Main St, Anytown, USA",
      },
      items: [
        {
          description: "Income Tax Payment",
          amount: invoiceData.montant,
        },
      ],
      subtotal: invoiceData.montant,
      tax: 0,
      total: invoiceData.montant,
      status: "Paid",
      noPlaque: invoiceData.noPlaque,
      denomination: invoiceData.denomination,
      motif: invoiceData.motif,
    };

    setTimeout(() => {
      setInvoice(mockInvoice);
      setLoading(false);
    }, 500);
  }, [id, location.state]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading invoice...</p>
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
          Back
        </Button>
        <Button
          variant="outline"
          onClick={handlePrint}
          className="gap-1 text-xs"
        >
          <Printer className="h-4 w-4" />
          Print
        </Button>
      </div>

      <Card className="mx-auto max-w-xs relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-20 print-background">
          <img src={logo} alt="" className="w-32 h-32" />{" "}
        </div>

        <CardHeader>
          <div className="flex flex-col items-center justify-center space-y-2 md:flex-row md:space-y-0 ">
            <div className="z-10">
              <img src={logo} alt="" className="w-16 h-16" />{" "}
            </div>
            <div className="text-center text-xs z-10">
              <h2 className="font-bold">République démocratique du Congo</h2>
              <p>Province du Haut Katanga</p>
              <p>Secteur des BALAMBA</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="text-right">
              <div className="space-y-1">
                <div className="flex justify-between">
                  <p className="text-xs font-medium">Quittance:</p>
                  <p className="text-xs">Nº 001</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-xs">Plaque:</p>
                  <p className="text-xs">{invoice.noPlaque}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-xs font-medium">Status:</p>
                  <p className="text-xs text-green-500">{invoice.status}</p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <div className="">
              <div className="grid grid-cols-2 p-2 font-medium text-xs">
                <div>Dénomination</div>
                <div className="text-right">{invoice.denomination}</div>
              </div>
              <div className="grid grid-cols-2 p-2 font-medium text-xs">
                <div>Montant</div>
                <div className="text-right">{invoice.total} FC</div>
              </div>
              <div className="grid grid-cols-2 p-2 font-medium text-xs">
                <div>Motif</div>
                <div className="text-right">{invoice.motif}</div>
              </div>
              <Separator />
            </div>
          </div>

          <div className="flex flex-col items-end space-y-1">
            <div className="flex w-full justify-between text-xs">
              <p className="font-medium">Nom du percepteur/trice:</p>
              <p>Kasong Mulaj</p>
            </div>
            <div className="flex w-full justify-between text-xs">
              <p className="font-medium">Fait à Tshinsenda le:</p>
              <p>15/03/2025</p>
            </div>
            <Separator className="w-full" />
            <div className="flex w-full justify-between text-xs font-bold">
              <p>Signature:</p>
            </div>
          </div>
        </CardContent>

        <CardFooter className="text-center text-xs text-muted-foreground">
          {/* <p>
      Thank you for your payment. This is an official receipt for your tax
      payment.
    </p> */}
        </CardFooter>
      </Card>
    </div>
  );
}
