"use server";
import axios from "axios";

const apiUrl = "https://office-assist-api.vercel.app/api/v1/users";

export const getUsers = async () => {
  try {
    const response = await axios.get(`${apiUrl}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUser = async (id: string) => {
  try {
    const response = await axios.get(`${apiUrl}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (user: any) => {
  try {
    const response = await axios.put(`${apiUrl}/${user._id}`, user);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (id: string) => {
  try {
    const response = await axios.delete(`${apiUrl}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
