"use client";
import React from "react";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { cn } from "@/utils/cn";
import { IconBrandGoogle } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useMutation } from "react-query";
import { signUp } from "@/service/authService";
import { toast } from "sonner";

export default function SignUp() {
  const { mutate, isLoading } = useMutation(signUp, {
    onSuccess: () => {
      toast("Signup successful");
    },
    onError: (error: any) => {
      toast(error.response.data.error);
      console.error("Error signing up:", error.response.data.error);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      name: ((formData.get("firstname") as string) +
        " " +
        formData.get("lastname")) as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };
    mutate(data);
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to Office Assist
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Sign Up and let's renew your office experience
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input
              id="firstname"
              name="firstname"
              placeholder="Girma"
              type="text"
              required
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <Input
              id="lastname"
              name="lastname"
              placeholder="Kebede"
              type="text"
              required
            />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            name="email"
            placeholder="epherata@gmail.com"
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
        <LabelInputContainer className="mb-8">
          <Label htmlFor="confirmpassword">Confirm password</Label>
          <Input
            id="confirmpassword"
            name="confirmpassword"
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
          {isLoading ? "Signing up..." : "Sign up →"}
          <BottomGradient />
        </Button>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
          if you already have an account yet,{" "}
          <Link href="/auth/signin" className=" text-blue-500 font-bold">
            Login
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
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
