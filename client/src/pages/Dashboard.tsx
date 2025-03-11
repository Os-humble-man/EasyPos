"use client";

import { useState } from "react";
import { CreditCard, LogOut, Plus, Receipt, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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

export default function DashboardPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      // Show success message or redirect
    }, 1500);
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <MainContainer>
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-10 border-b bg-background">
          <div className="container flex h-16 items-center justify-between px-4">
            <h1 className="text-lg font-semibold">Tax Payment System</h1>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="h-5 w-5" />
                <span className="sr-only">Logout</span>
              </Button>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
                <span className="sr-only">User</span>
              </Button>
            </div>
          </div>
        </header>
        <main className="flex-1 container py-6">
          <div className="grid gap-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight">
                Welcome, User
              </h2>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-1">
                  <Receipt className="h-4 w-4" />
                  View History
                </Button>
                <Button size="sm" className="gap-1">
                  <Plus className="h-4 w-4" />
                  New Payment
                </Button>
              </div>
            </div>

            <Tabs defaultValue="new-payment" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="new-payment">New Payment</TabsTrigger>
                <TabsTrigger value="payment-history">
                  Payment History
                </TabsTrigger>
              </TabsList>
              <TabsContent value="new-payment" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Tax Payment Form</CardTitle>
                    <CardDescription>
                      Fill in the details to process your tax payment
                    </CardDescription>
                  </CardHeader>
                  <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Tax Information</h3>
                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="grid gap-2">
                            <Label htmlFor="tax-type">Tax Type</Label>
                            <Select required>
                              <SelectTrigger id="tax-type">
                                <SelectValue placeholder="Select tax type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="income">
                                  Income Tax
                                </SelectItem>
                                <SelectItem value="property">
                                  Property Tax
                                </SelectItem>
                                <SelectItem value="sales">Sales Tax</SelectItem>
                                <SelectItem value="vat">VAT</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="tax-period">Tax Period</Label>
                            <Select required>
                              <SelectTrigger id="tax-period">
                                <SelectValue placeholder="Select period" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="q1-2025">Q1 2025</SelectItem>
                                <SelectItem value="q2-2025">Q2 2025</SelectItem>
                                <SelectItem value="q3-2025">Q3 2025</SelectItem>
                                <SelectItem value="q4-2025">Q4 2025</SelectItem>
                                <SelectItem value="annual-2025">
                                  Annual 2025
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="tax-amount">Amount</Label>
                          <Input
                            id="tax-amount"
                            type="number"
                            placeholder="0.00"
                            required
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="tax-reference">
                            Reference Number
                          </Label>
                          <Input
                            id="tax-reference"
                            placeholder="e.g. TX-12345"
                            required
                          />
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Payment Method</h3>
                        <RadioGroup defaultValue="card">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="card" id="payment-card" />
                            <Label
                              htmlFor="payment-card"
                              className="flex items-center gap-2"
                            >
                              <CreditCard className="h-4 w-4" />
                              Credit/Debit Card
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="bank" id="payment-bank" />
                            <Label htmlFor="payment-bank">Bank Transfer</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="mobile"
                              id="payment-mobile"
                            />
                            <Label htmlFor="payment-mobile">
                              Mobile Payment
                            </Label>
                          </div>
                        </RadioGroup>

                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="grid gap-2">
                            <Label htmlFor="card-number">Card Number</Label>
                            <Input
                              id="card-number"
                              placeholder="1234 5678 9012 3456"
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="card-name">Name on Card</Label>
                            <Input id="card-name" placeholder="John Doe" />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="card-expiry">Expiry Date</Label>
                            <Input id="card-expiry" placeholder="MM/YY" />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="card-cvc">CVC</Label>
                            <Input id="card-cvc" placeholder="123" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        type="submit"
                        className="w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Processing..." : "Process Payment"}
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>
              <TabsContent value="payment-history" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Payment History</CardTitle>
                    <CardDescription>
                      View your recent tax payments
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <div className="grid grid-cols-5 p-4 font-medium">
                        <div>Date</div>
                        <div>Reference</div>
                        <div>Tax Type</div>
                        <div>Amount</div>
                        <div>Status</div>
                      </div>
                      <Separator />
                      <div className="grid grid-cols-5 p-4">
                        <div>2025-03-10</div>
                        <div>TX-12345</div>
                        <div>Income Tax</div>
                        <div>$1,250.00</div>
                        <div className="text-green-500">Completed</div>
                      </div>
                      <Separator />
                      <div className="grid grid-cols-5 p-4">
                        <div>2025-02-15</div>
                        <div>TX-12344</div>
                        <div>Property Tax</div>
                        <div>$850.00</div>
                        <div className="text-green-500">Completed</div>
                      </div>
                      <Separator />
                      <div className="grid grid-cols-5 p-4">
                        <div>2025-01-20</div>
                        <div>TX-12343</div>
                        <div>VAT</div>
                        <div>$320.00</div>
                        <div className="text-green-500">Completed</div>
                      </div>
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
