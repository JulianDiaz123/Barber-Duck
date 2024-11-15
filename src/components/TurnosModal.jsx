import { createPortal } from "react-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getAllTurnos, deleteTurno } from "../services/turnos.js";
import "./turnosModal.css";

function TurnosModal({ show, onCloseClick }) {
  const queryClient = useQueryClient();

  const {
    data: turnos,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["turnos"],
    queryFn: getAllTurnos,
    enabled: show,
  });

  const mutationDeleteTurno = useMutation({
    mutationKey: ["delete-turno"],
    mutationFn: deleteTurno,
    onSuccess: () => {
      alert("El turno ha sido eliminado correctamente");
      queryClient.invalidateQueries("turnos");
    },
    onError: (error) => {
      console.error("Error al eliminar el servicio", error.message);
    },
  });

  const handleDeleteTurno = (id) => {
    if (window.confirm("Seguro que desea eliminar este turno:")) {
      mutationDeleteTurno.mutate(id);
    }
  };

  useEffect(() => {
    console.log(turnos);
  }, [turnos]);

  if (isLoading) return <p>Cargando turnos...</p>;
  if (error) return <p>Error al cargar los turnos...</p>;

  if (!show) {
    return null;
  }
  return createPortal(
    <div className="modal_wrapper">
      <div className="turnos-container">
        <div className="turnos-scroll">
          <ul>
            {turnos?.map((turno) => (
              <li key={turno.id}>
                <p>{turno.fH_turno}</p>
                <button
                  className="delete-turno"
                  onClick={() => handleDeleteTurno(turno.id)}
                >
                  Borrar
                </button>
              </li>
            ))}
          </ul>
        </div>

        <button className="close-btn" onClick={onCloseClick}>
          X
        </button>
      </div>
    </div>,
    document.body
  );
}

export default TurnosModal;
