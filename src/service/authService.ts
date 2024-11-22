import axios from "axios";

const apiUrl = "https://office-assist-api.vercel.app/api/v1/auth";

export const signUp = async (user: any) => {
  try {
    const response = await axios.post(`${apiUrl}/signup`, user);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const signIn = async (user: any) => {
  try {
    const response = await axios.post(`${apiUrl}/login`, user);
    sessionStorage.setItem("user", JSON.stringify(response.data.user));
    sessionStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    throw error;
  }
};
