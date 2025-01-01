"use client";

import React, { useState } from "react";
import { createProduct } from "@/service/productService"; // Adjust the path as needed
import { useMutation, useQueryClient } from "react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const AddProduct: React.FC = () => {
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [description, setDescription] = useState("");

  const createProductMutation = useMutation(createProduct, {
    onSuccess: () => {
      toast.success("Product added successfully!");
      queryClient.invalidateQueries(["products"]);
    },
    onError: () => {
      toast.error("Failed to add product.");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !quantity || !image || !description) {
      toast.error("Please fill in all fields.");
      return;
    }

    const productData = {
      title: name,
      price,
      quantity,
      productImage: image,
      description,
    };

    createProductMutation.mutateAsync(productData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-4 bg-white rounded shadow-md w-full max-w-md mx-auto"
    >
      <div>
        <Label>Title</Label>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter product name"
          className="w-full"
        />
      </div>
      <div>
        <Label>Price</Label>
        <Input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter product price"
          className="w-full"
        />
      </div>
      <div>
        <Label>Quantity</Label>
        <Input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Enter product quantity"
          className="w-full"
        />
      </div>
      <div>
        <Label>Description</Label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter product description"
          className="w-full"
        />
      </div>
      <div>
        <Label>Image</Label>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="w-full"
        />
      </div>
      <div className="flex justify-between">
        <Button type="submit" disabled={createProductMutation.isLoading}>
          {createProductMutation.isLoading ? "Adding..." : "Add Product"}
        </Button>
        <Button
          type="reset"
          onClick={() => {
            setName("");
            setPrice("");
            setQuantity("");
            setDescription("");
            setImage(null);
          }}
        >
          Reset
        </Button>
      </div>
    </form>
  );
};

export default AddProduct;
