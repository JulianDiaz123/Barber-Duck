import "./card.css";
import { Link } from "wouter";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "../services/productos";
import PutModal from "./product-modals/PutModal";
import useModal from "../hooks/use-modal.js";
import { useAuthStore } from "../store/auth";

function Card({ id, producto, marca, precio, imgUrl }) {
  const isAuthenticated = useAuthStore((data) => data.isAuthenticated);
  const user = useAuthStore((data) => data.user);

  const queryClient = useQueryClient();
  const { show, toggle } = useModal(true);

  const mutationDeleteProduct = useMutation({
    mutationKey: ["delete-post"],
    mutationFn: () => deleteProduct(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries("posts");
    },
    onError: () => {
      alert("Error al eliminar producto");
    },
  });

  const handleDeleteProduct = () => {
    const isConfirmed = window.confirm(
      "¿Estás seguro de que deseas eliminar este producto?"
    );
    if (isConfirmed) {
      mutationDeleteProduct.mutate(id);
    }
  };
  return (
    <div className="card-container">
      <div className="product-img">
        <img src={imgUrl} alt={producto} />
      </div>
      <h3 className="producto">{producto}</h3>
      <h4 className="marca">{marca}</h4>
      <h5 className="precio">{`${precio}$`}</h5>
      <Link to={`/producto/${id}`} className="btn-info">
        Ver más
      </Link>
      {isAuthenticated && user && user.roles == "Admin" ? (
        <div className="btn-control">
          <button className="delete-btn" onClick={handleDeleteProduct}>
            Borrar
          </button>
          <button className="put-btn" onClick={toggle}>
            Actualizar
          </button>
          <PutModal show={show} onCloseClick={toggle} id={id} />
        </div>
      ) : null}
    </div>
  );
}

export default Card;
