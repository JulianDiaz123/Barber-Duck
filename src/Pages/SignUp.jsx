import React, { useState } from "react";
import "./signUp.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { useAuthStore } from "../store/auth";
import { register } from "../services/auth.js";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { schema } from "../validation/register.js";

// function SignUp() {
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(schema),
//   });

//   const { handleLogin } = useAuthStore((state) => ({
//     handleLogin: state.handleLogin,
//   }));

//   const [location, setLocation] = useLocation();

//   const registerMutation = useMutation({
//     mutationKey: ["register"],
//     mutationFn: async (newUser) => {
//       const response = await register(newUser);
//       return response.data; // Ajuste para obtener solo los datos necesarios
//     },
//     onSuccess: (data) => {
//       handleLogin(data); // Guardar datos del usuario en el estado global

//       alert("Registro exitoso");

//       reset(); // Reiniciar el formulario
//       setLocation("/"); // Redirigir a la página de inicio
//     },
//     onError: (error) => {
//       console.error(
//         "Error en el registro:",
//         error.response ? error.response.data : error.message
//       );
//       if (error.response && error.response.data.errors) {
//         console.error(
//           "Detalles del error de validación:",
//           error.response.data.errors
//         );
//       }
//     },
//   });

//   const onSubmit = (data) => {
//     console.log("Datos enviados:", data);
//     registerMutation.mutate(data);
//   };

//   return (
//     <div className="signup-container">
//       <form className="signup" onSubmit={handleSubmit(onSubmit)}>
//         <h2>REGISTRARSE</h2>
//         <input
//           className="inputs"
//           type="text"
//           name="apelnom"
//           id="apelnom"
//           placeholder="Nombre y apellido"
//           {...register("apelnom")}
//         />
//         {errors.apelnom && <p>{errors.apelnom.message}</p>}

//         <input
//           className="inputs"
//           type="text"
//           name="tel"
//           id="tel"
//           placeholder="Teléfono"
//           {...register("tel")}
//         />
//         {errors.tel && <p>{errors.tel.message}</p>}

//         <input
//           className="inputs"
//           type="text"
//           name="username"
//           id="username"
//           placeholder="Nombre de usuario"
//           {...register("username")}
//         />
//         {errors.username && <p>{errors.username.message}</p>}

//         <input
//           className="inputs"
//           type="email"
//           name="email"
//           id="email"
//           placeholder="Email"
//           {...register("email")}
//         />
//         {errors.email && <p>{errors.email.message}</p>}

//         <input
//           className="inputs"
//           type="password"
//           name="password"
//           id="password"
//           placeholder="Contraseña"
//           {...register("password")}
//         />
//         {errors.password && <p>{errors.password.message}</p>}

//         <input type="submit" value="Registrarse" className="btn-registrar" />
//       </form>
//     </div>
//   );
// }

// export default SignUp;

function SignUp() {
  const [location, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const [newUser, setNewUser] = useState({
    apelNom: "",
    email: "",
    password: "",
    telefono: "",
    userName: "",
  });

  const registerMutation = useMutation({
    mutationKey: ["register"],
    mutationFn: register,
    onSuccess: (data) => {
      alert("Se registro correctamente");
      console.log("Registrado", data);
      queryClient.invalidateQueries("register");
      setLocation("/");
    },
    onError: (error) => {
      console.error("Algo salio mal", error.message);
    },
  });
  const handleRegister = (e) => {
    e.preventDefault();
    if (
      newUser.apelNom &&
      newUser.email &&
      newUser.password &&
      newUser.telefono &&
      newUser.userName
    ) {
      registerMutation.mutate(newUser);
      setNewUser({
        apelNom: "",
        email: "",
        password: "",
        telefono: "",
        userName: "",
      });
    } else {
      console.error("algo salio mal");
    }
  };

  return (
    <div className="signup-container">
      <form className="signup" onSubmit={handleRegister}>
        <h2>REGISTRARSE</h2>
        <input
          className="inputs"
          type="text"
          name="apelnom"
          id="apelnom"
          placeholder="Nombre y apellido"
          value={newUser.apelNom}
          onChange={(e) => setNewUser({ ...newUser, apelNom: e.target.value })}
        />

        <input
          className="inputs"
          type="text"
          name="telefono"
          id="telefono"
          placeholder="Teléfono"
          value={newUser.telefono}
          onChange={(e) => setNewUser({ ...newUser, telefono: e.target.value })}
        />

        <input
          className="inputs"
          type="text"
          name="username"
          id="username"
          placeholder="Nombre de usuario"
          value={newUser.userName}
          onChange={(e) => setNewUser({ ...newUser, userName: e.target.value })}
        />

        <input
          className="inputs"
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />

        <input
          className="inputs"
          type="password"
          name="password"
          id="password"
          placeholder="Contraseña"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        />

        <input type="submit" value="Registrarse" className="btn-registrar" />
      </form>
    </div>
  );
}

export default SignUp;
