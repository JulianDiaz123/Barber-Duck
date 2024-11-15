import axios from "axios";
import { useAuthStore } from "../store/auth";

const getToken = () => {
  const token = useAuthStore.getState().token;
  return token;
};
// API URL
const { VITE_API_URL: apiUrl } = import.meta.env;

//Obtener todos los productos
export const getAllProducts = async () => {
  const { data } = await axios.get(`${apiUrl}/productos`);
  return data;
};

//Obtener un producto por id
export const getOneProductById = async (id) => {
  const { data } = await axios.get(`${apiUrl}/productos/${id}`);
  return data;
};

//Crear un nuevo producto
export const createProduct = async (newProduct) => {
  const token = getToken();
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const { data } = await axios.post(`${apiUrl}/productos`, newProduct, config);
  return data;
};

// //Actualizar un producto
export const updateProduct = async (id, updatedProduct) => {
  if (!id) throw new Error("ID is required");
  const token = getToken();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  const { data } = await axios.put(
    `${apiUrl}/productos/${id}`,
    updatedProduct,
    config
  );
  return data;
};

//Borrar un producto
export const deleteProduct = async (id) => {
  const token = getToken();
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const { data } = await axios.delete(`${apiUrl}/productos/${id}`, config);
  return data;
};
