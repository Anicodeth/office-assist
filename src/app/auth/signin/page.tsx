"use client";
import React from "react";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useMutation } from "react-query";
import { signIn } from "@/service/authService";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
export default function SignIn() {
  const router = useRouter();
  const { mutate, isLoading } = useMutation(signIn, {
    onSuccess: () => {
      toast("Login successful");
      router.push("/dashboard");
    },
    onError: (error: any) => {
      toast(error.response.data.error);
      console.error("Error logging in:", error.response.data.error);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      console.error("Email and password are required");
      toast("Email and password are required");
      return;
    }

    mutate({ email, password });
  };

  return (
    <div className="max-w-md w-full mx-auto p-4 md:p-8 shadow-input bg-white dark:bg-black rounded-none md:rounded-2xl">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome Back to Office Assist
      </h2>

      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            name="email"
            placeholder="ananya@gmail.com"
            type="email"
            required
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            placeholder="••••••••"
            type="password"
            required
          />
        </LabelInputContainer>

        <Button
          className="w-full hover:text-black font-bold"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login →"}
          <BottomGradient />
        </Button>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
          If you don&apos;t have an account yet,{" "}
          <Link href="/auth/signup" className="text-blue-500 font-bold">
            Sign Up
          </Link>
        </p>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={`flex flex-col space-y-2 w-full ${className}`}>
      {children}
    </div>
  );
};
