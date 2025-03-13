"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Download, Printer } from "lucide-react";
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

export default function InvoicePage() {
  const navigate = useNavigate();
  const { id } = useParams(); // Correct use of useParams
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, fetch the invoice data from an API
    // For this demo, we'll use mock data
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
          amount: 1250.0,
        },
      ],
      subtotal: 1250.0,
      tax: 0,
      total: 1250.0,
      status: "Paid",
    };

    setTimeout(() => {
      setInvoice(mockInvoice);
      setLoading(false);
    }, 500);
  }, [id]);

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
          onClick={() => navigate.back()}
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

      <Card className="mx-auto max-w-xs">
        <CardHeader>
          <div className="flex flex-col items-center justify-between space-y-2 md:flex-row md:space-y-0">
            <div>
              <CardTitle className="text-xl">Invoice</CardTitle>
              <CardDescription className="text-xs">
                Invoice #{invoice.number}
              </CardDescription>
            </div>
            <div className="text-right text-xs">
              <h2 className="font-bold">Tax Payment System</h2>
              <p>123 Government St, Capital City</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <h3 className="text-xs font-medium">Bill To:</h3>
              <p className="font-medium">{invoice.user.name}</p>
              <p className="text-xs">{invoice.user.email}</p>
              <p className="text-xs">{invoice.user.address}</p>
            </div>
            <div className="text-right">
              <div className="space-y-1">
                <div className="flex justify-between">
                  <p className="text-xs font-medium">Invoice Date:</p>
                  <p className="text-xs">{invoice.date}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-xs font-medium">Payment Date:</p>
                  <p className="text-xs">{invoice.dueDate}</p>
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
            <h3 className="mb-2 text-xs font-medium">Invoice Items</h3>
            <div className="rounded-md border">
              <div className="grid grid-cols-2 p-2 font-medium text-xs">
                <div>Description</div>
                <div className="text-right">Amount</div>
              </div>
              <Separator />
              {invoice.items.map((item, index) => (
                <div key={index}>
                  <div className="grid grid-cols-2 p-2 text-xs">
                    <div>{item.description}</div>
                    <div className="text-right">${item.amount.toFixed(2)}</div>
                  </div>
                  {index < invoice.items.length - 1 && <Separator />}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-end space-y-1">
            <div className="flex w-full justify-between text-xs">
              <p className="font-medium">Subtotal:</p>
              <p>${invoice.subtotal.toFixed(2)}</p>
            </div>
            <div className="flex w-full justify-between text-xs">
              <p className="font-medium">Tax:</p>
              <p>${invoice.tax.toFixed(2)}</p>
            </div>
            <Separator className="w-full" />
            <div className="flex w-full justify-between text-xs font-bold">
              <p>Total:</p>
              <p>${invoice.total.toFixed(2)}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="text-center text-xs text-muted-foreground">
          <p>
            Thank you for your payment. This is an official receipt for your tax
            payment.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
