import { useState } from "react";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import * as yup from "yup";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import MainContainer from "@/layout";
import PaymentService from "@/services/PaymentService";

const schema = yup.object().shape({
  noPlaque: yup.string().required("Le numéro de plaque est requis"),
  denomination: yup.string().required("La dénomination est requise"),
  montant: yup
    .number()
    .required("Le montant est requis")
    .positive("Le montant doit être positif"),
  motif: yup.string().required("Le motif est requis"),
});

export default function DashboardPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      denomination: "inflammable", // Valeur par défaut
    },
  });

  const denominationValue = watch("denomination");

  const onSubmit = async (data: {
    noPlaque: string;
    denomination: string;
    montant: number;
    motif: string;
  }) => {
    setIsSubmitting(true);
    try {
      const payment = {
        noPlaque: data.noPlaque,
        amount: data.montant,
        reason: data.motif,
        denomination:
          denominationValue === "inflammable" ? undefined : denominationValue,
      };
      const response = await PaymentService.createPayment(payment);
      console.log(response);

      if (response) {
        toast("Paiement effectué avec succès.");
        navigate(`/invoice/${response.id}`, {
          state: {
            noPlaque: data.noPlaque,
            denomination: data.denomination,
            montant: data.montant,
            motif: data.motif,
          },
        });
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error(error);
      toast("Une erreur s'est produite. Veuillez réessayer.");
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <MainContainer>
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-10 border-b bg-background">
          <div className="container flex h-16 items-center justify-between px-4">
            <h1 className="text-lg font-semibold">EasyPos</h1>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="h-5 w-5" />
                <span className="sr-only">Logout</span>
              </Button>
            </div>
          </div>
        </header>
        <main className="flex-1 container py-6">
          <div className="grid gap-6">
            <div className=" items-center justify-between hidden md:flex">
              <h2 className="text-2xl font-bold tracking-tight">
                Welcome, User
              </h2>
            </div>

            <Tabs defaultValue="new-payment" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="new-payment">Nouvelle paiement</TabsTrigger>
                <TabsTrigger value="payment-history">
                  Historique des paiement
                </TabsTrigger>
              </TabsList>
              <TabsContent value="new-payment" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Formulaire de paiement</CardTitle>
                    <CardDescription>
                      Veuillez completez les informations ci-dessous
                    </CardDescription>
                  </CardHeader>
                  <div className="flex justify-center items-center min-h-1/2 bg-gray-100 p-4">
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="w-full max-w-md bg-white p-6 rounded-lg shadow-md"
                    >
                      <div className="mb-4">
                        <label
                          htmlFor="noPlaque"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          No Plaque
                        </label>
                        <Controller
                          name="noPlaque"
                          control={control}
                          defaultValue=""
                          render={({ field }) => (
                            <Input
                              {...field}
                              id="noPlaque"
                              placeholder="Entrez le numéro de plaque"
                              className="w-full"
                            />
                          )}
                        />
                        {errors.noPlaque && (
                          <p className="text-sm text-red-500 mt-1">
                            {errors.noPlaque.message}
                          </p>
                        )}
                      </div>

                      <div className="mb-4">
                        <label
                          htmlFor="denomination"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Dénomination
                        </label>
                        <Controller
                          name="denomination"
                          control={control}
                          defaultValue="inflammable"
                          render={({ field }) => (
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Sélectionnez une taxe" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="inflammable">
                                  Inflammable
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        />
                        {errors.denomination && (
                          <p className="text-sm text-red-500 mt-1">
                            {errors.denomination.message}
                          </p>
                        )}
                      </div>

                      <div className="mb-4">
                        <label
                          htmlFor="montant"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Montant
                        </label>
                        <Controller
                          name="montant"
                          control={control}
                          render={({ field }) => (
                            <Input
                              {...field}
                              type="number"
                              id="montant"
                              placeholder="Entrez le montant"
                              className="w-full"
                            />
                          )}
                        />
                        {errors.montant && (
                          <p className="text-sm text-red-500 mt-1">
                            {errors.montant.message}
                          </p>
                        )}
                      </div>

                      <div className="mb-6">
                        <label
                          htmlFor="motif"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Motif
                        </label>
                        <Controller
                          name="motif"
                          control={control}
                          defaultValue=""
                          render={({ field }) => (
                            <Textarea
                              {...field}
                              id="motif"
                              placeholder="Entrez le motif"
                              className="w-full"
                            />
                          )}
                        />
                        {errors.motif && (
                          <p className="text-sm text-red-500 mt-1">
                            {errors.motif.message}
                          </p>
                        )}
                      </div>

                      <Button type="submit" className="w-full">
                        {isSubmitting ? "Processing..." : "Paiment"}
                      </Button>
                    </form>
                  </div>
                </Card>
              </TabsContent>
              <TabsContent value="payment-history" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Historique des paiement</CardTitle>
                    <CardDescription>
                      Historique des paiements effectués
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <div className="hidden md:grid md:grid-cols-5 p-4 font-medium">
                        <div>Date</div>
                        <div>Reference</div>
                        <div>Montant</div>
                      </div>
                      {/* <Separator className="hidden md:block" />
                      <div className="grid grid-cols-1 md:grid-cols-5 p-4 gap-2 md:gap-0">
                        <div className="font-medium md:hidden">Date</div>
                        <div>2025-03-10</div>
                        <div className="font-medium md:hidden">Reference</div>
                        <div className="md:col-span-1">TX-12345</div>
                        <div className="font-medium md:hidden">Tax Type</div>
                        <div className="md:col-span-1">Income Tax</div>
                        <div className="font-medium md:hidden">Amount</div>
                        <div className="md:col-span-1">$1,250.00</div>
                        <div className="font-medium md:hidden">Status</div>
                        <div className="text-green-500 md:col-span-1">
                          Completed
                        </div>
                      </div>
                      <Separator /> */}

                      {/* <div className="grid grid-cols-1 md:grid-cols-5 p-4 gap-2 md:gap-0">
                        <div className="font-medium md:hidden">Date</div>
                        <div>2025-02-15</div>
                        <div className="font-medium md:hidden">Reference</div>
                        <div className="md:col-span-1">TX-12344</div>
                        <div className="font-medium md:hidden">Tax Type</div>
                        <div className="md:col-span-1">Property Tax</div>
                        <div className="font-medium md:hidden">Amount</div>
                        <div className="md:col-span-1">$850.00</div>
                        <div className="font-medium md:hidden">Status</div>
                        <div className="text-green-500 md:col-span-1">
                          Completed
                        </div>
                      </div>
                      <Separator /> */}

                      {/* <div className="grid grid-cols-1 md:grid-cols-5 p-4 gap-2 md:gap-0">
                        <div className="font-medium md:hidden">Date</div>
                        <div>2025-01-20</div>
                        <div className="font-medium md:hidden">Reference</div>
                        <div className="md:col-span-1">TX-12343</div>
                        <div className="font-medium md:hidden">Tax Type</div>
                        <div className="md:col-span-1">VAT</div>
                        <div className="font-medium md:hidden">Amount</div>
                        <div className="md:col-span-1">$320.00</div>
                        <div className="font-medium md:hidden">Status</div>
                        <div className="text-green-500 md:col-span-1">
                          Completed
                        </div>
                      </div> */}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </MainContainer>
  );
}
