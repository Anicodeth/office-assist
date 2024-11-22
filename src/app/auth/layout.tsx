"use client";
import Image from "next/image";
import manHappy from "../../assets/happyman.png";
import { usePathname } from "next/navigation";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const current_path = usePathname();
  const last = current_path.split("/").pop();

  return (
    <div className="h-screen flex flex-col sm:flex-row items-center justify-center">
      <div className="hidden sm:flex w-full sm:w-1/2 h-full justify-center items-center bg-[#b3b3bb]">
          <Image
            src={manHappy}
            alt="Happy man"
            width={500}
            height={300}
          />
      </div>
      <div className="w-full sm:w-1/2 h-full flex justify-center items-center bg-mainlighter ">
        {children}
      </div>
    </div>
  );
}
