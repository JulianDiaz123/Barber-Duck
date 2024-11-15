import { createPortal } from "react-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { createService } from "../services/servicios";
import "./serviceModal.css";

function ServiceModal({ show, onCloseClick }) {
  const queryClient = useQueryClient();

  const [newService, setNewService] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
  });

  const mutationCreateService = useMutation({
    mutationKey: ["create-service"],
    mutationFn: createService,
    onSucces: (data) => {
      console.log("producto creado", data);
      alert("El servicio se guardo correctamente");
      queryClient.invalidateQueries("services");
    },
    onError: (error) => {
      console.error("Algo salio mal", error.message);
    },
  });

  const handleAddService = (e) => {
    e.preventDefault();
    if (newService.nombre && newService.descripcion && newService.precio) {
      mutationCreateService.mutate(newService);
      setNewService({
        nombre: "",
        descripcion: "",
        precio: "",
      });
    } else {
      console.error("algo salio mal");
    }
  };
  if (!show) {
    return null;
  }
  return createPortal(
    <div className="modal_wrapper">
      <div className="service_content">
        <h3>Agregue un nuevo servicio</h3>
        <form onSubmit={handleAddService}>
          <input
            type="text"
            name="nombre"
            id="nombre"
            placeholder="Servicio"
            value={newService.nombre}
            onChange={(e) =>
              setNewService({ ...newService, nombre: e.target.value })
            }
          />
          <input
            type="text"
            name="descripcion"
            id="descripcion"
            placeholder="Descripcion"
            value={newService.descripcion}
            onChange={(e) =>
              setNewService({ ...newService, descripcion: e.target.value })
            }
          />
          <input
            type="text"
            name="precio"
            id="precio"
            placeholder="Precio"
            value={newService.precio}
            onChange={(e) =>
              setNewService({ ...newService, precio: e.target.value })
            }
          />
          <button className="subm-service" type="submit">
            Agregar
          </button>
        </form>
        <button onClick={onCloseClick} className="btn-close">
          X
        </button>
      </div>
    </div>,
    document.body
  );
}

export default ServiceModal;
