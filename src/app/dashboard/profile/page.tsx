"use client";
import { User } from "@/hooks/useUser";
import { getUserOrders } from "@/service/orderService";
import { Hourglass } from "react-loader-spinner";
import { useQuery } from "react-query";

export default function Profile() {
  const user = JSON.parse(sessionStorage.getItem("user") as string) as User;

  const { data: orders, isLoading: ordersLoading } = useQuery("orders", () =>
    getUserOrders(user._id)
  );

  if (ordersLoading) {
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
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
          Profile
        </h1>
        <div className="border-b border-gray-200 pb-4 mb-6">
          <h2 className="text-2xl font-semibold text-gray-700">{user.name}</h2>
          <h3 className="text-lg text-gray-600">{user.email}</h3>
        </div>

        <div>
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Cart</h2>
          {ordersLoading ? (
            <div className="text-center text-gray-500">Loading...</div>
          ) : (
            <div className="space-y-4">
              {orders.map((order: any) => (
                <div
                  key={order._id}
                  className="bg-gray-100 p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
                >
                  <h3 className="text-xl font-semibold text-gray-700">
                    {order.title}
                  </h3>
                  <p className="text-gray-600">Product ID: {order.product}</p>
                  <p className="text-gray-600">Quantity: {order.quantity}</p>
                  <p className="text-gray-600">Phone: {order.phone}</p>
                  <p className="text-gray-600">ETB{order.totalPayment}</p>
                  <p className="text-gray-600">{order.deliveryAddress}</p>
                  <p className="text-gray-600">
                    Payment Status: {order.paymentStatus}
                  </p>
                  <p className="text-gray-600">
                    Delivery Status: {order.orderStatus}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
