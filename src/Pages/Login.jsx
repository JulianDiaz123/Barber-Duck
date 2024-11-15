import React from "react";
import "./login.css";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { login } from "../services/auth";
import { useLocation } from "wouter";
import { useAuthStore } from "../store/auth";

function Login() {
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
  });

  const handleChange = (e) => {
    const { value, name } = e.target;

    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const { handleLogin } = useAuthStore((data) => data);
  const [location, setLocation] = useLocation();
  const loginMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: login,
    onSuccess: (data) => {
      handleLogin(data);
      setLocation("/");
      alert("salio todo bien");
    },
    onError: (error) => {
      console.error(
        "Error en el inicio de sesión:",
        error.response ? error.response.data : error.message
      );
      if (error.response && error.response.data.errors) {
        console.error(
          "Detalles del error de validación:",
          error.response.data.errors
        );
      }
    },
  });

  const handleSumbit = (e) => {
    e.preventDefault();

    loginMutation.mutate(user);
    setUser({
      username: "",
      password: "",
      email: "",
    });
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSumbit} className="login">
        <h2>INICIAR SESION</h2>
        <input
          className="inputs"
          type="username"
          name="username"
          placeholder="usuario"
          value={user.username}
          onChange={handleChange}
        />
        <input
          className="inputs"
          type="email"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleChange}
        />
        <input
          className="inputs"
          type="password"
          name="password"
          placeholder="Contraseña"
          value={user.password}
          onChange={handleChange}
        />

        <button type="submit" className="btn-login">
          Iniciar secion
        </button>

        <a href="#">¿Olvidaste tu contraseña?</a>
      </form>
    </div>
  );
}

export default Login;
