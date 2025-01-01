"use client";
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { toast } from "sonner";
import {
  getOrders,
  updateOrderStatus,
  updatePaymentStatus,
  deleteOrder,
} from "@/service/orderService"; // Adjust the import path
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getProduct } from "@/service/productService";
import { getUser } from "@/service/userService";

const ManageOrders: React.FC = () => {
  const queryClient = useQueryClient();
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  // Fetch all orders
  const { data: orders, isLoading } = useQuery(["orders"], getOrders);

  // Mutations
  const updateOrderStatusMutation = useMutation(updateOrderStatus, {
    onSuccess: () => {
      toast.success("Order status updated successfully.");
      queryClient.invalidateQueries(["orders"]);
    },
    onError: () => {
      toast.error("Failed to update order status.");
    },
  });

  const updatePaymentStatusMutation = useMutation(updatePaymentStatus, {
    onSuccess: () => {
      toast.success("Payment status updated successfully.");
      queryClient.invalidateQueries(["orders"]);
    },
    onError: () => {
      toast.error("Failed to update payment status.");
    },
  });

  const deleteOrderMutation = useMutation(deleteOrder, {
    onSuccess: () => {
      toast.success("Order deleted successfully.");
      queryClient.invalidateQueries(["orders"]);
    },
    onError: () => {
      toast.error("Failed to delete order.");
    },
  });

  const handleUpdateStatus = (id: string, status: string) => {
    updateOrderStatusMutation.mutateAsync({ id, status });
  };

  const handleUpdatePayment = (id: string, status: string) => {
    updatePaymentStatusMutation.mutateAsync({ id, status });
  };

  const handleDelete = (id: string) => {
    deleteOrderMutation.mutateAsync(id);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Manage Orders</h1>
      <table className="w-full border-collapse bg-white shadow-md rounded-lg">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Order ID</th>
            <th className="p-2">User</th>
            <th className="p-2">Total</th>
            <th className="p-2">Status</th>
            <th className="p-2">Payment</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((order: any) => (
            <tr key={order._id} className="border-b">
              <td className="p-2">{order._id}</td>
              <td className="p-2">{order.user || "Unknown"}</td>
              <td className="p-2">ETB {order.totalPayment}</td>
              <td className="p-2">
                <Input
                  type="text"
                  defaultValue={order.orderStatus}
                  onBlur={(e) => handleUpdateStatus(order._id, e.target.value)}
                />
              </td>
              <td className="p-2">
                <Input
                  type="text"
                  defaultValue={order.paymentStatus}
                  onBlur={(e) => handleUpdatePayment(order._id, e.target.value)}
                />
              </td>
              <td className="p-2 flex gap-2">
                <OrderDialog selectedOrder={order} />
                <Button color="error" onClick={() => handleDelete(order._id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageOrders;

function OrderDialog({ selectedOrder }: { selectedOrder: any }) {
  //query product by id
  const { data: product, isLoading: isLoadingProduct } = useQuery(
    ["product", selectedOrder.product],
    () => getProduct(selectedOrder.product)
  );

  //query user
  const { data: user, isLoading: isLoadingUser } = useQuery(
    ["user", selectedOrder.user],
    () => getUser(selectedOrder.user)
  );

  if (isLoadingProduct || isLoadingUser) {
    return <div>Loading...</div>;
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button>View</Button>
      </DialogTrigger>
      <DialogContent>
        <h2 className="text-xl font-bold">Order Details</h2>
        <p>Order ID: {selectedOrder._id}</p>
        <p>User: {selectedOrder.user || "Unknown"}</p>
        <p>ProductId: {selectedOrder.product} </p>
        <p>Product Name: {product?.title}</p>
        <p>User Name: {user ? user?.name : "Unknown"}</p>
        <p>Quantity: {selectedOrder.quantity}</p>
        <p>Order Status: {selectedOrder.orderStatus}</p>
        <p>Delivery Address: {selectedOrder.deliveryAddress}</p>
        <p>Phone: {selectedOrder.phone}</p>
        <p>Total: ETB {selectedOrder.totalPayment}</p>
        <p>Payment Status: {selectedOrder.paymentStatus}</p>
      </DialogContent>
    </Dialog>
  );
}
