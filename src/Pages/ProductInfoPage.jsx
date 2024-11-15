import React from "react";
import HomePage from "./HomePage";
import { useParams } from "wouter";
import "./productoInfo.css";
import { getOneProductById } from "../services/productos.js";
import { useQuery } from "@tanstack/react-query";

function ProductInfoPage() {
  const { id } = useParams();
  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["post", id],
    queryFn: () => getOneProductById(id),
  });

  if (isLoading) {
    return (
      <HomePage>
        <p>Cargando...</p>
      </HomePage>
    );
  }

  if (error) {
    return (
      <HomePage>
        <p>Error al cargar el producto</p>
      </HomePage>
    );
  }

  const producto = product;

  return (
    <HomePage>
      {producto ? (
        <div className="product-info-container" key={producto.id}>
          <img
            className="img-produc"
            src={producto?.url_imagen}
            alt={producto.producto}
          />
          <div>
            <section className="info">
              <h4 className="marca">{producto?.marca}</h4>
              <h2>{producto?.nombre}</h2>
              <a className="categoria" href="#">
                {producto?.categoria}
              </a>
              <p className="precio2">
                <b>{producto?.precio}$</b>
              </p>
              <p>{producto?.descripcion}</p>
              <p>Existencias: {producto?.existencias}</p>
            </section>
            <button className="comprar-button">Comprar</button>
          </div>
        </div>
      ) : (
        <p>Producto no encontrado</p>
      )}
    </HomePage>
  );
}

export default ProductInfoPage;
