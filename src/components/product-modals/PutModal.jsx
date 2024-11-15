import { createPortal } from "react-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { updateProduct, getOneProductById } from "../../services/productos.js";
import "./productModal.css";

function PutModal({ show, onCloseClick, id }) {
  const queryClient = useQueryClient();
  const [updatedProduct, setUpdatedProduct] = useState({
    nombre: "",
    descripcion: "",
    categoria: "",
    marca: "",
    precio: "",
    existencias: "",
    url_imagen: "",
  });

  useEffect(() => {
    if (id && show) {
      getOneProductById(id)
        .then((product) => {
          setUpdatedProduct({
            nombre: product.nombre || "",
            descripcion: product.descripcion || "",
            categoria: product.categoria || "",
            marca: product.marca || "",
            precio: product.precio || 0,
            existencias: product.existencias || 0,
            url_imagen: product.url_imagen || "",
          });
        })
        .catch((error) => {
          console.error("Error al obtener los detalles del producto:", error);
        });
    }
  }, [id, show]);

  const mutationUpdateProduct = useMutation({
    mutationKey: ["update-posts"],
    mutationFn: (updatedProduct) => updateProduct(id, updatedProduct),
    onSuccess: (data) => {
      queryClient.invalidateQueries("posts");
      alert("El producto se actualizó correctamente");
    },
    onError: (error) => {
      console.error("Algo salió mal:", error.message);
      alert("Algo salió mal");
    },
  });

  const handleUpdateProduct = (e) => {
    e.preventDefault();
    console.log("Datos del producto a actualizar:", updatedProduct);
    mutationUpdateProduct.mutate(updatedProduct);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct({ ...updatedProduct, [name]: value });
  };

  if (!show) {
    return null;
  }

  return createPortal(
    <div className="modal_wrapper">
      <div className="product_content">
        <h3>Actualizar producto</h3>
        <form onSubmit={handleUpdateProduct}>
          <input
            type="text"
            name="nombre"
            id="nombre"
            placeholder="Nombre"
            value={updatedProduct.nombre}
            onChange={handleInputChange}
          />

          <input
            type="text"
            name="marca"
            id="marca"
            placeholder="Marca"
            value={updatedProduct.marca}
            onChange={handleInputChange}
          />

          <input
            type="text"
            name="descripcion"
            id="descripcion"
            placeholder="Descripción"
            value={updatedProduct.descripcion}
            onChange={handleInputChange}
          />

          <input
            type="number"
            name="precio"
            id="precio"
            placeholder="Precio"
            value={updatedProduct.precio}
            onChange={handleInputChange}
          />

          <input
            type="number"
            name="existencias"
            id="existencias"
            placeholder="Existencias"
            value={updatedProduct.existencias}
            onChange={handleInputChange}
          />

          <input
            type="text"
            name="url_imagen"
            id="url_imagen"
            placeholder="URL Imagen"
            value={updatedProduct.url_imagen}
            onChange={handleInputChange}
          />

          <button className="btn-submit" type="submit">
            Actualizar
          </button>
        </form>

        <button className="close-btn" onClick={onCloseClick}>
          X
        </button>
      </div>
    </div>,
    document.body
  );
}

export default PutModal;
