import axios from "axios";
import { useAuthStore } from "../store/auth";

const { VITE_API_URL: apiUrl } = import.meta.env;

const getToken = () => {
  const token = useAuthStore.getState().token;
  return token;
};

export const getAllTurnos = async () => {
  const token = getToken();
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const { data } = await axios.get(`${apiUrl}/turnos`, config);
  return data;
};

export const createTurno = async (newTurno) => {
  const token = getToken();
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const { data } = await axios.post(`${apiUrl}/turnos`, newTurno, config);
  return data;
};

export const deleteTurno = async (id) => {
  const token = getToken();
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const { data } = await axios.delete(`${apiUrl}/turnos/${id}`, config);
  return data;
};
