import React from "react";
import { useAuthStore } from "../store/auth";
import useModal from "../hooks/use-modal";
import TurnosModal from "./TurnosModal";
import { createTurno } from "../services/turnos";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import "./turnos.css";

function Turnos() {
  const queryClient = useQueryClient();
  const isAuthenticated = useAuthStore((data) => data.isAuthenticated);
  const user = useAuthStore((data) => data.user);

  const { show, toggle } = useModal(true);

  const [newTurno, setNewTurno] = useState({});

  return (
    <>
      <section className="turno">
        {isAuthenticated !== true ? (
          <span className="blocked">Inicie secion</span>
        ) : null}

        <h4>Registrar turnos</h4>
        <form>
          <label htmlFor="fecha-turno">Fecha y hora:</label>
          <input
            className="inp-date"
            type="datetime-local"
            id="fecha-turno"
            name="fecha-turno"
          />

          <label htmlFor="metodopago">Metodo de pago</label>
          <input
            className="inp-date"
            type="text"
            id="metodopago"
            name="metodopago"
          />

          <button className="subm" type="submit">
            Registrar
          </button>
        </form>
        {isAuthenticated && user && user.roles == "Admin" ? (
          <>
            <button className="info-turnos" onClick={toggle}>
              +
            </button>
            <TurnosModal show={show} onCloseClick={toggle} />
          </>
        ) : null}
      </section>
    </>
  );
}

export default Turnos;
