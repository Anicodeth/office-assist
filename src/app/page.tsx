"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/auth/signin");
  };

  return (
    <div className="bg-gray-500 text-white min-h-screen flex items-center justify-center">
      <div className="text-center px-6">
        <h1 className="text-5xl font-bold mb-4">Welcome to Office Assist</h1>
        <p className="text-lg mb-6">
          Your ultimate destination for premium office appliances.
        </p>
        <Button
          onClick={handleRedirect}
          className="px-6 py-3 bg-white text-gray-500 font-semibold rounded hover:bg-gray-200"
        >
          Sign In
        </Button>
      </div>
    </div>
  );
}
