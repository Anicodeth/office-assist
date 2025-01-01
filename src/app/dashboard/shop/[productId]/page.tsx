"use client";
import React, { useContext } from "react";

import { getProduct, checkout } from "@/service/productService";
import { Hourglass } from "react-loader-spinner";
import { useQuery } from "react-query";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { createOrder } from "@/service/orderService";
import { useMutation } from "react-query";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, useUser } from "@/hooks/useUser";
import { UserContext } from "@/context/UserContext";

export default function productDetails({
  params,
}: {
  params: { productId: string };
}) {
  const { data: product, isLoading: productLoading } = useQuery("product", () =>
    getProduct(params.productId)
  );

  if (productLoading)
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
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Product Details
      </h1>
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          {product.title}
        </h2>
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        <p className="text-gray-600 mb-4">{product.description}</p>
        <p className="text-xl font-bold text-gray-800">ETB{product.price}</p>
        <CheckOutDialog product={product} />
      </div>
    </div>
  );
}

function CheckOutDialog({ product }: { product: any }) {
  const [address, setAddress] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [phone, setPhone] = useState("");
  const router = useRouter();
  const checkOutMutation = useMutation(createOrder);

  const handleCheckout = async () => {
    const user = JSON.parse(sessionStorage.getItem("user") as string) as User;

    if (!user) {
      toast.error("Please login to continue");
      return;
    }

    if (!address) {
      toast.error("Please provide an address");
      return;
    }

    if (quantity < 1) {
      toast.error("Please provide a valid quantity");
      return;
    }

    if (!phone) {
      toast.error("Please provide a phone number");
      return;
    }

    checkOutMutation.mutateAsync(
      {
        user: user._id,
        product: product._id,
        quantity,
        deliveryAddress: address,
        totalPayment: product.price * quantity,
        phone,
      },
      {
        onSuccess: async (response) => {
          const name: string[] = user.name.split(" ");

          const checkoutURL = await checkout({
            orderId: response._id,
            amount: (product.price * quantity).toString(),
            currency: "ETB",
            email: user.email,
            first_name: name[0],
            last_name: name[1],
            phone_number: phone,
          });

          router.push(checkoutURL);
        },
      }
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full mb-1">Buy Product</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Buy Product</DialogTitle>
          <DialogDescription>{product.description}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="address" className="text-right">
              Address
            </Label>
            <Input
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="col-span-3 w-60"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">
              Phone
            </Label>
            <Input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="col-span-3 w-60"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quantity" className="text-right">
              Quantity
            </Label>
            <Input
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="col-span-3 w-60"
              type="number"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Total Payment</Label>
            <span className="col-span-3">ETB {product.price * quantity}</span>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleCheckout}>
            {checkOutMutation.isLoading ? "Redirecting... " : "Checkout"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
