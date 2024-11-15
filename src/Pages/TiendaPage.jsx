import React from "react";
import HomePage from "./HomePage";
import Card from "../components/Card";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllProducts } from "../services/productos";
import "./tiendaPage.css";
import PostModal from "../components/product-modals/PostModal";
import useModal from "../hooks/use-modal";
import { useAuthStore } from "../store/auth";

function TiendaPage() {
  const isAuthenticated = useAuthStore((data) => data.isAuthenticated);
  const user = useAuthStore((data) => data.user);
  const queryClient = useQueryClient();

  const { show, toggle } = useModal(true);

  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: getAllProducts,
  });

  if (isLoading) return <p>Cargando producto...</p>;
  if (error) return <p>Error al cargar producto...</p>;

  return (
    <HomePage>
      <div className="cards-container">
        <h2>Productos</h2>
        {isAuthenticated && user && user.roles == "Admin" ? (
          <>
            <button className="post-btn" onClick={toggle}>
              Agregar
            </button>
            <PostModal show={show} onCloseClick={toggle} />
          </>
        ) : null}
        <ul>
          {products?.map((product) => (
            <li key={product.id}>
              <Card
                id={product.id}
                producto={product.nombre}
                marca={product.marca}
                precio={product.precio}
                imgUrl={product.url_imagen}
              />
            </li>
          ))}
        </ul>
      </div>
    </HomePage>
  );
}

export default TiendaPage;
