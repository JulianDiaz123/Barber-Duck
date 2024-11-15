import React from "react";
import ServiceModal from "./ServiceModal";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import useModal from "../hooks/use-modal";
import { getAllServices, deleteService } from "../services/servicios";
import { useAuthStore } from "../store/auth";
import "./services.css";
function Services() {
  const queryClient = useQueryClient();
  const user = useAuthStore((data) => data.user);
  const isAuthenticated = useAuthStore((data) => data.isAuthenticated);
  const { show, toggle } = useModal(true);
  const {
    data: services,
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ["services"],
    queryFn: getAllServices,
    enabled: false,
  });

  const mutationDeleteService = useMutation({
    mutationKey: ["delete-service"],
    mutationFn: deleteService,
    onSuccess: () => {
      alert("El servicio ha sido eliminado correctamente.");
      queryClient.invalidateQueries("services");
    },
    onError: (error) => {
      console.error("Error al eliminar el servicio:", error.message);
    },
  });
  const handleDeleteService = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este servicio?")) {
      mutationDeleteService.mutate(id);
    }
  };

  if (isLoading) return <p>Cargando servicios...</p>;
  if (error) return <p>Error al cargar los servicios...</p>;
  return (
    <>
      <h2>SERVICIOS</h2>
      {isAuthenticated && user && user.roles == "Admin" ? (
        <>
          <button className="add-service" onClick={toggle}>
            Agregar
          </button>
          <ServiceModal show={show} onCloseClick={toggle} />
        </>
      ) : null}
      <section className="servicios-container">
        <ul>
          {services?.map((service) => (
            <li key={service.id}>
              <p>{service.nombre}:</p>
              <strong>{service.precio}</strong>
              {isAuthenticated && user && user?.roles == "Admin" ? (
                <button
                  className="delete-service"
                  onClick={() => handleDeleteService(service.id)}
                >
                  X
                </button>
              ) : null}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

export default Services;
