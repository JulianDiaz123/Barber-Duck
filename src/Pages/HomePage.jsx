import { Link, useLocation } from "wouter";
import "../assets/icons/fontello-4c57e3a1/fontello-4c57e3a1/css/fontello.css";
import "./HomePage.css";
import UserModal from "../components/UserModal";
import useModal from "../hooks/use-modal";
import Slider from "../components/slider/Slider.jsx";
import { listImg } from "../components/slider/imgSlider.js";
import { useAuthStore } from "../store/auth.js";
import { getAllServices } from "../services/servicios.js";
import { useQuery } from "@tanstack/react-query";
import Services from "../components/Services.jsx";
import Turnos from "../components/Turnos.jsx";

function HomePage({ children }) {
  const user = useAuthStore((data) => data.user);
  const isAuthenticated = useAuthStore((data) => data.isAuthenticated);

  const { show, toggle } = useModal(true);

  const [location, setLocation] = useLocation();
  const handleClick = (path) => {
    if (location !== path) {
      setLocation(path);
    }
  };

  const {
    data: services,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["services"],
    queryFn: getAllServices,
  });

  if (isLoading) return <p>Cargando servicios...</p>;
  if (error) return <p>Error al cargar los servicios...</p>;

  return (
    <div className="homeContainer">
      <header className="homeHeader">
        {isAuthenticated === false ? (
          <div className="authContainer">
            <Link className="btn" to="/login">
              Iniciar Seción
            </Link>
            <Link className="btn" to="/signup">
              Registrarse
            </Link>
          </div>
        ) : (
          <span className="icon-user" onClick={toggle}></span>
        )}
        <div className="nombrePag">
          <a onClick={() => handleClick("/")}>
            <h1>Barber Duck</h1>
          </a>
        </div>

        <nav className="menu">
          <ul>
            <li>
              <a className="menuItem" onClick={() => handleClick("/")}>
                Inicio
              </a>
            </li>
            <li>
              <a className="menuItem" onClick={() => handleClick("/nosotros")}>
                Nosotros
              </a>
            </li>
            <li>
              <a className="menuItem" onClick={() => handleClick("/tienda")}>
                Tienda
              </a>
            </li>
          </ul>
        </nav>
        <UserModal show={show} onCloseClick={toggle} user={user} />
      </header>
      <main className="homeMain">
        {children !== undefined ? (
          children
        ) : (
          <>
            <Slider imgList={listImg} />
            <Services />
            <Turnos />
          </>
        )}
      </main>
      <footer className="homeFooter"></footer>
    </div>
  );
}

export default HomePage;
