"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import UserService from "@/services/userService";

export default function LoginPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      setErrorMessage(null); // Réinitialiser le message d'erreur

      // const response = await UserService.login(data.email, data.password);

      // if (response.status === 200) {
      //   navigate("/dashboard");
      // } else {
      //   setErrorMessage("Invalid email or password");
      // }

      UserService.login(data.email, data.password)
        .then((response) => {
          console.log("Login successful:", response);
          navigate("/dashboard");
          // Le token est automatiquement stocké dans le sessionStorage
        })
        .catch((error) => {
          setErrorMessage(
            error.response?.data?.message || "An error occurred during login"
          );
          console.error("Login failed:", error.message);
        });
    } catch (error: any) {
      console.error(error);
      setErrorMessage(
        error.response?.data?.message || "An error occurred during login"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" flex h-screen w-screen flex-col items-center justify-center p-4">
      {/* <Link to="/" className="absolute left-4 top-4 md:left-8 md:top-8">
        <Button variant="ghost" className="gap-1">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </Link> */}
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Connexion</CardTitle>
          <CardDescription>
            Entrer votre email et votre mot de passe
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="email"
                    type="email"
                    placeholder="email@exemple.com"
                  />
                )}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Controller
                name="password"
                control={control}
                rules={{
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                }}
                render={({ field }) => (
                  <Input {...field} id="password" type="password" />
                )}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full my-4" type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Se Connecter"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
      {errorMessage && (
        <p className="text-red-500 text-sm text-center mt-4">{errorMessage}</p>
      )}
      {/* <p className="mt-4 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          to="/register"
          className="underline underline-offset-4 hover:text-primary"
        >
          Register
        </Link>
      </p> */}
    </div>
  );
}
