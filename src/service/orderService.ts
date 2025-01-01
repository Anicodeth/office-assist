// const orderSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//   },
//   product: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Product",
//   },
//   quantity: {
//     type: Number,
//     required: true,
//   },
//   deliveryAddress: {
//     type: String,
//     required: true,
//   },
//   totalPayment: {
//     type: Number,
//     required: true,
//   },
//   paymentId: {
//     type: String,
//   },
//   paymentStatus: {
//     type: String,
//     default: Status.PENDING,
//   },
//   orderStatus: {
//     type: String,
//     default: Status.PENDING,
//   },
// });

import axios from "axios";

const apiUrl = "https://office-assist-api.vercel.app/api/v1/orders";

export const createOrder = async (order: any) => {
  try {
    const response = await axios.post(`${apiUrl}/`, order);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getOrders = async () => {
  try {
    const response = await axios.get(`${apiUrl}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getOrder = async (id: string) => {
  try {
    const response = await axios.get(`${apiUrl}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateOrder = async (id: string, order: any) => {
  try {
    const response = await axios.put(`${apiUrl}/${id}`, order);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteOrder = async (id: string) => {
  try {
    const response = await axios.delete(`${apiUrl}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateOrderStatus = async (status: any) => {
  try {
    const response = await axios.put(`${apiUrl}/${status.id}/delivery`, {
      status: status.status,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updatePaymentStatus = async (status: any) => {
  try {
    const response = await axios.put(`${apiUrl}/${status.id}/payment`, {
      status: status.status,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserOrders = async (userId: string) => {
  try {
    const response = await axios.get(`${apiUrl}/user/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
