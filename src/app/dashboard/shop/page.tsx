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

export default function Shop() {
  const { data: products, isLoading: productsLoading } = useQuery(
    "products",
    getProducts
  );

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
          <Card>
            <CardHeader>
              <div className="w-40 h-32">
                <img src={product.image} />
              </div>
              <CardTitle>{product.title}</CardTitle>
              <CardDescription>product.description</CardDescription>
            </CardHeader>
            <CardContent>
              <Button>View details</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
