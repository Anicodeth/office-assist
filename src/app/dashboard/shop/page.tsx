"use client";
import { getProducts } from "@/service/productService";
import { useQuery } from "react-query";
import { Button } from "@/components/ui/button";
import { Hourglass } from "react-loader-spinner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function Shop() {
  const router = useRouter();
  const { data: products, isLoading: productsLoading } = useQuery(
    "products",
    getProducts
  );

  const handleDetails = (productId: string) => {
    router.push(`/dashboard/shop/${productId}`);
  };

  if (productsLoading)
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Hourglass
          visible={true}
          height="80"
          width="80"
          ariaLabel="hourglass-loading"
          wrapperStyle={{}}
          wrapperClass=""
          colors={["#000000", "#000000"]}
        />
      </div>
    );

  return (
    <>
      <h1 className="p-2 font-bold"> Products</h1>
      <div className="flex flex-row flex-wrap items-center gap-2 p-2">
        {products.map((product: any) => (
          <Card key={product._id}>
            <CardHeader>
              <div className="w-40 h-32">
                <img className="w-40 h-32" src={product.image} />
              </div>
              <CardTitle>{product.title}</CardTitle>
              <CardDescription>product.description</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => handleDetails(product._id)}>
                View details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
