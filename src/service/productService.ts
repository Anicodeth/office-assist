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