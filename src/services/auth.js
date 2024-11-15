import axios from "axios";
const { VITE_API_URL: apiUrl } = import.meta.env;

export const login = async (user) => {
  try {
    const { data } = await axios.post(`${apiUrl}/auth/login`, user);
    return data;
  } catch (error) {
    console.error(
      "Error en la solicitud de inicio de sesión:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const register = async (newUser) => {
  try {
    const { data } = await axios.post(`${apiUrl}/auth/register`, newUser);
    return data;
  } catch (error) {
    console.error("Error en la solicitud de registro", error);
  }
};

// export const register = async (newUser) => {
//   try {
//     const { data } = await axios.post(`${apiUrl}/auth/register`, newUser);
//     return data;
//   } catch (error) {
//     console.error(
//       "Error en la solicitud de registro:",
//       error.response ? error.response.data : error.message
//     );
//     if (error.response && error.response.data.errors) {
//       console.error(
//         "Detalles del error de validación:",
//         error.response.data.errors
//       );
//     }
//     throw error;
//   }
// };
