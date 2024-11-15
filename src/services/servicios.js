import axios from "axios";
import { useAuthStore } from "../store/auth";

const { VITE_API_URL: apiUrl } = import.meta.env;

const getToken = () => {
  const token = useAuthStore.getState().token;
  return token;
};

export const getAllServices = async () => {
  const { data } = await axios.get(`${apiUrl}/Servicios`);
  return data;
};

export const createService = async (newService) => {
  const token = getToken();
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const { data } = await axios.post(`${apiUrl}/Servicios`, newService, config);
  return data;
};

export const deleteService = async (id) => {
  const token = getToken();
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const { data } = await axios.delete(`${apiUrl}/Servicios/${id}`, config);
  return data;
};
