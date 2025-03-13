"use client";

import { useState } from "react";
import { Calendar, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Layout from "@/layout/PageLayout";

export default function AdminDashboardPage() {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data for transactions
  const transactions = [
    {
      id: 1,
      user: "John Doe",
      email: "john@example.com",
      date: "2025-03-10",
      reference: "TX-12345",
      type: "Income Tax",
      amount: 1250.0,
      status: "Completed",
    },
    {
      id: 2,
      user: "Jane Smith",
      email: "jane@example.com",
      date: "2025-03-09",
      reference: "TX-12344",
      type: "Property Tax",
      amount: 850.0,
      status: "Completed",
    },
    {
      id: 3,
      user: "Robert Johnson",
      email: "robert@example.com",
      date: "2025-03-08",
      reference: "TX-12343",
      type: "VAT",
      amount: 320.0,
      status: "Completed",
    },
    {
      id: 4,
      user: "Sarah Williams",
      email: "sarah@example.com",
      date: "2025-03-07",
      reference: "TX-12342",
      type: "Sales Tax",
      amount: 540.0,
      status: "Pending",
    },
    {
      id: 5,
      user: "Michael Brown",
      email: "michael@example.com",
      date: "2025-03-06",
      reference: "TX-12341",
      type: "Income Tax",
      amount: 1800.0,
      status: "Completed",
    },
    {
      id: 6,
      user: "Emily Davis",
      email: "emily@example.com",
      date: "2025-03-05",
      reference: "TX-12340",
      type: "Property Tax",
      amount: 920.0,
      status: "Failed",
    },
  ];

  // Filter transactions based on search term
  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const printInvoice = (id: number) => {
    console.log(`Printing invoice for transaction ${id}`);
    // In a real application, this would generate and print an invoice
    alert(`Invoice for transaction ${id} is being prepared for printing.`);
  };

  return (
    <Layout>
      <main className="flex-1 p-4 lg:p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <Calendar className="h-4 w-4" />
              Select Date Range
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3 lg:gap-8 mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$5,680.00</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Transactions
              </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <path d="M2 10h20" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+42</div>
              <p className="text-xs text-muted-foreground">
                +12.5% from last week
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Users
              </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+127</div>
              <p className="text-xs text-muted-foreground">
                +8.2% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" className="mt-6">
          <TabsList>
            <TabsTrigger value="all">All Transactions</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="failed">Failed</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>All Transactions</CardTitle>
                <CardDescription>
                  View all tax payment transactions from users
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Reference</TableHead>
                      <TableHead>Tax Type</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTransactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>
                          <div className="font-medium">{transaction.user}</div>
                          <div className="text-sm text-muted-foreground">
                            {transaction.email}
                          </div>
                        </TableCell>
                        <TableCell>{transaction.date}</TableCell>
                        <TableCell>{transaction.reference}</TableCell>
                        <TableCell>{transaction.type}</TableCell>
                        <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                        <TableCell>
                          <span
                            className={
                              transaction.status === "Completed"
                                ? "text-green-500"
                                : transaction.status === "Pending"
                                ? "text-amber-500"
                                : "text-red-500"
                            }
                          >
                            {transaction.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => printInvoice(transaction.id)}
                            className="h-8 w-8 p-0"
                          >
                            <FileText className="h-4 w-4" />
                            <span className="sr-only">Print Invoice</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="completed" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Completed Transactions</CardTitle>
                <CardDescription>
                  View all completed tax payment transactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Reference</TableHead>
                      <TableHead>Tax Type</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTransactions
                      .filter((t) => t.status === "Completed")
                      .map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell>
                            <div className="font-medium">
                              {transaction.user}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {transaction.email}
                            </div>
                          </TableCell>
                          <TableCell>{transaction.date}</TableCell>
                          <TableCell>{transaction.reference}</TableCell>
                          <TableCell>{transaction.type}</TableCell>
                          <TableCell>
                            ${transaction.amount.toFixed(2)}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => printInvoice(transaction.id)}
                              className="h-8 w-8 p-0"
                            >
                              <FileText className="h-4 w-4" />
                              <span className="sr-only">Print Invoice</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="pending" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Pending Transactions</CardTitle>
                <CardDescription>
                  View all pending tax payment transactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Reference</TableHead>
                      <TableHead>Tax Type</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTransactions
                      .filter((t) => t.status === "Pending")
                      .map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell>
                            <div className="font-medium">
                              {transaction.user}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {transaction.email}
                            </div>
                          </TableCell>
                          <TableCell>{transaction.date}</TableCell>
                          <TableCell>{transaction.reference}</TableCell>
                          <TableCell>{transaction.type}</TableCell>
                          <TableCell>
                            ${transaction.amount.toFixed(2)}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => printInvoice(transaction.id)}
                              className="h-8 w-8 p-0"
                            >
                              <FileText className="h-4 w-4" />
                              <span className="sr-only">Print Invoice</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="failed" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Failed Transactions</CardTitle>
                <CardDescription>
                  View all failed tax payment transactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Reference</TableHead>
                      <TableHead>Tax Type</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTransactions
                      .filter((t) => t.status === "Failed")
                      .map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell>
                            <div className="font-medium">
                              {transaction.user}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {transaction.email}
                            </div>
                          </TableCell>
                          <TableCell>{transaction.date}</TableCell>
                          <TableCell>{transaction.reference}</TableCell>
                          <TableCell>{transaction.type}</TableCell>
                          <TableCell>
                            ${transaction.amount.toFixed(2)}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => printInvoice(transaction.id)}
                              className="h-8 w-8 p-0"
                            >
                              <FileText className="h-4 w-4" />
                              <span className="sr-only">Print Invoice</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </Layout>
  );
}
