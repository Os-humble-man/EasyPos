import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-lg font-semibold">EasyPos</h1>
          <div className="ml-auto flex items-center gap-4">
            <Link to="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link to="/register">
              <Button>Register</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Simplified Tax Payment Solution
                  </h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Our platform makes it easy to process tax payments, track
                    transactions, and generate invoices.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link to="/">
                    <Button className="gap-1">
                      Get Started
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="grid gap-6">
                  <div className="flex items-start gap-4 rounded-lg border p-6">
                    <div className="grid gap-1">
                      <h3 className="text-xl font-semibold">
                        User-Friendly Interface
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Simple and intuitive interface for processing tax
                        payments.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 rounded-lg border p-6">
                    <div className="grid gap-1">
                      <h3 className="text-xl font-semibold">Admin Dashboard</h3>
                      <p className="text-sm text-muted-foreground">
                        Comprehensive dashboard for administrators to monitor
                        all transactions.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 rounded-lg border p-6">
                    <div className="grid gap-1">
                      <h3 className="text-xl font-semibold">
                        Invoice Generation
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Generate and print invoices directly from the POS
                        system.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6 lg:px-8">
          <p className="text-sm text-muted-foreground">
            © 2025 Oscar Kng. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link
              to="#"
              className="text-sm text-muted-foreground underline-offset-4 hover:underline"
            >
              Terms of Service
            </Link>
            <Link
              to="#"
              className="text-sm text-muted-foreground underline-offset-4 hover:underline"
            >
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
