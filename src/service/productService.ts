"use server";
import axios from "axios";

const apiUrl = "https://office-assist-api.vercel.app/api/v1/products";

export const getProducts = async () => {
  try {
    const response = await axios.get(`${apiUrl}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProduct = async (id: string) => {
  try {
    const response = await axios.get(`${apiUrl}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

interface CheckOutPayLoad {
  orderId: string;
  amount: string;
  currency: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
}

export const checkout = async (data: CheckOutPayLoad) => {
  const randomid = Math.floor(Math.random() * 1000000000);

  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Bearer CHASECK_TEST-kJLPb9m8lB8zDlVStvhxdKDT6bUHXjxS"
  );
  myHeaders.append("Content-Type", "application/json");
  var raw = JSON.stringify({
    amount: data.amount,
    currency: data.currency,
    email: data.email,
    first_name: data.first_name,
    last_name: data.last_name,
    phone_number: data.phone_number,
    tx_ref: `chewatatest-${randomid} ${data.first_name} ${data.phone_number}`,
    callback_url: `https://office-assist-api.vercel.app/api/v1/orders/${data.orderId}/payment`,
    return_url: "http://localhost:3000/dashboard/shop",
  });
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  const response: any = await fetch(
    "https://api.chapa.co/v1/transaction/initialize",
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => console.log("error", error));

  return response.data.checkout_url;
};

export const createProduct = async (data: any) => {
  try {
    const formData = new FormData();
    for (const key in data) {
      if (data[key]) {
        formData.append(key, data[key]);
      }
    }
    console.log(`formData`, formData);
    const response = await axios.post(`${apiUrl}/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateProduct = async (product: any) => {
  try {
    const response = await axios.put(`${apiUrl}/${product._id}`, product);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const response = await axios.delete(`${apiUrl}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
