import { createPortal } from "react-dom";
import { useAuthStore } from "../store/auth";
import { useLocation } from "wouter";
import "./userModal.css";

function UserModal({ show, onCloseClick, user }) {
  const { handleLogout } = useAuthStore((data) => data);
  const handleLogoutClick = () => {
    handleLogout();
    onCloseClick();
  };

  if (!show) {
    return null;
  }
  return createPortal(
    <div className="modal_wrapper">
      <div className="modal_content">
        <div className="info-user">
          <div className="modal-usuario">
            <div className="usuario-img"></div>
            <h4>{user.email}</h4>
            <h4>{user.nombre}</h4>
            <h4>{user.roles}</h4>
          </div>
          <button className="logout-button" onClick={handleLogoutClick}>
            Cerrar sesion
          </button>
        </div>
        <span className="img-fondo"></span>
        <button className="close-button" onClick={onCloseClick}>
          X
        </button>
      </div>
    </div>,
    document.body
  );
}

export default UserModal;
