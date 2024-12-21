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

export default function Dashboard() {
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
                  Shop for your office for high quality items!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button>Shop</Button>
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
