"use client";
import Image from "next/image";
import manHappy from "../../assets/happyman.png";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const user = JSON.parse(sessionStorage.getItem("user") as string) as User;

  const handleShop = () => {
    if (user.role == "customer") router.push("/dashboard/shop");
    else router.push("/dashboard/manageusers");
  };
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="flex items-center justify-between w-1/2">
          <div>
            <Image src={manHappy} alt="Happy man" width={100} height={60} />
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Office Assist</CardTitle>
                <CardDescription>
                  {user.role == "customer"
                    ? "Shop for your office for high quality items!"
                    : "Manage users and products!"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={handleShop}>
                  {user.role == "customer" ? "Shop" : "Manage"}
                </Button>
              </CardContent>
              <CardFooter>
                <p>Just a click away!</p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
