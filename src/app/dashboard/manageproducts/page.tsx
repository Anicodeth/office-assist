"use client";

import React from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  getProducts,
  deleteProduct,
  updateProduct,
} from "@/service/productService";
import { toast } from "sonner";
import { Hourglass } from "react-loader-spinner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function ManageProducts() {
  const queryClient = useQueryClient();

  // Fetch products using React Query
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery(["products"], getProducts);

  // Delete product mutation
  const deleteProductMutation = useMutation(deleteProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]); // Refetch products after delete
      alert("Product deleted successfully.");
    },
    onError: () => {
      alert("Failed to delete product.");
    },
  });

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      deleteProductMutation.mutate(id);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError)
    return <p className="text-red-500">{(error as Error).message}</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Manage Products</h1>
      <table className="min-w-full border border-gray-300 bg-white">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left border">Title</th>
            <th className="px-4 py-2 text-left border">Price</th>
            <th className="px-4 py-2 text-left border">Quantity</th>
            <th className="px-4 py-2 text-left border">Image</th>
            <th className="px-4 py-2 text-left border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product: any) => (
            <tr key={product._id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border">{product.title}</td>
              <td className="px-4 py-2 border">ETB {product.price}</td>
              <td className="px-4 py-2 border">{product.quantity}</td>
              <td className="px-4 py-2 border">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-16 h-10"
                />
              </td>
              <td className="px-4 py-2 border w-5 h-5">
                <button
                  className="text-white bg-red-500 px-3 py-1 rounded hover:bg-red-600 mr-2"
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </button>
                <EditProductDialog product={product} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function EditProductDialog({ product }: { product: any }) {
  const queryClient = useQueryClient();

  const updateProductMutation = useMutation(updateProduct, {
    onSuccess: () => {
      toast.success("Product updated successfully");
      queryClient.invalidateQueries(["products"]);
    },
    onError: () => {
      toast.error("Failed to update product");
    },
  });

  // State variables for the product fields
  const [name, setName] = useState(product.title);
  const [price, setPrice] = useState(product.price);
  const [quantity, setQuantity] = useState(product.quantity);
  const [image, setImage] = useState(product.image);

  const handleUpdate = () => {
    updateProductMutation.mutateAsync({
      _id: product._id,
      title: name,
      price: parseFloat(price), // Ensure price is a number
      quantity: parseInt(quantity, 10), // Ensure quantity is an integer
      image,
    });
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button>Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <div className="flex flex-col items-center w-full justify-center gap-4">
            <div>
              <Label>Name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <Label>Price</Label>
              <Input
                value={price}
                type="number"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div>
              <Label>Quantity</Label>
              <Input
                value={quantity}
                type="number"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div>
              <Label>Image URL</Label>
              <Input
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="Enter image URL"
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleUpdate}
                disabled={updateProductMutation.isLoading}
              >
                {updateProductMutation.isLoading ? "Updating..." : "Update"}
              </Button>
              <Button>Cancel</Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
