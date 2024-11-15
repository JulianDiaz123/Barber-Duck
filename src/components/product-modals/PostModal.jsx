import { createPortal } from "react-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { createProduct } from "../../services/productos.js";
import "./productModal.css";

function PostModal({ show, onCloseClick }) {
  const queryClient = useQueryClient();
  const [newProduct, setNewProduct] = useState({
    nombre: "",
    descripcion: "",
    categoria: "",
    marca: "",
    precio: "",
    existencias: "",
    url_imagen: "",
  });

  const mutationCreateProduct = useMutation({
    mutationKey: ["create-posts"],
    mutationFn: createProduct,
    onSuccess: (data) => {
      alert("El producto se guardo correctamente");
      console.log("Producto creado:", data);
      queryClient.invalidateQueries("posts");
    },
    onError: (error) => {
      console.error("Algo salio mal", error.message);
    },
  });

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (
      newProduct.nombre &&
      newProduct.descripcion &&
      newProduct.categoria &&
      newProduct.marca &&
      newProduct.precio &&
      newProduct.existencias &&
      newProduct.url_imagen
    ) {
      mutationCreateProduct.mutate(newProduct);
      setNewProduct({
        nombre: "",
        descripcion: "",
        categoria: "",
        marca: "",
        precio: "",
        existencias: "",
        url_imagen: "",
      });
    } else {
      console.error("algo salio mal");
      alert("algo salio mal");
    }
  };

  if (!show) {
    return null;
  }

  return createPortal(
    <div className="modal_wrapper">
      <div className="product_content">
        <h3>Agregue un nuevo producto</h3>
        <form onSubmit={handleAddProduct}>
          <input
            type="text"
            name="nombre"
            id="producto"
            placeholder="producto"
            value={newProduct.nombre}
            onChange={(e) =>
              setNewProduct({ ...newProduct, nombre: e.target.value })
            }
          />

          <input
            type="text"
            name="marca"
            id="marca"
            placeholder="marca"
            value={newProduct.marca}
            onChange={(e) =>
              setNewProduct({ ...newProduct, marca: e.target.value })
            }
          />

          <input
            type="text"
            name="categoria"
            id="categoria"
            placeholder="categoria"
            value={newProduct.categoria}
            onChange={(e) =>
              setNewProduct({ ...newProduct, categoria: e.target.value })
            }
          />
          <input
            type="text"
            name="descripcion"
            id="descripcion"
            placeholder="descripcion"
            value={newProduct.descripcion}
            onChange={(e) =>
              setNewProduct({ ...newProduct, descripcion: e.target.value })
            }
          />

          <input
            type="number"
            name="precio"
            id="precio"
            placeholder="precio"
            value={newProduct.precio}
            onChange={(e) =>
              setNewProduct({ ...newProduct, precio: e.target.value })
            }
          />

          <input
            type="number"
            name="existencias"
            id="existencias"
            placeholder="existencias"
            value={newProduct.existencias}
            onChange={(e) =>
              setNewProduct({ ...newProduct, existencias: e.target.value })
            }
          />

          <input
            type="text"
            name="url_imagen"
            id="img-url"
            placeholder="img-url"
            value={newProduct.url_imagen}
            onChange={(e) =>
              setNewProduct({ ...newProduct, url_imagen: e.target.value })
            }
          />
          <button className="btn-submit" type="submit">
            Guardar
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

export default PostModal;
