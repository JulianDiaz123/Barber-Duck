import React from "react";
import HomePage from "./HomePage";
import "./nosotros.css";
import "../assets/icons/fontello-4c57e3a1/fontello-4c57e3a1/css/fontello.css";

function NosotrosPage() {
  return (
    <>
      <HomePage>
        <section className="nosotros-info">
          <div className="info-container">
            <div className=" nosotros">
              <h2>Nosotros</h2>
              <p>
                Bienvenidos a <strong>Barber Duck</strong>, la barbería más
                emblemática de Villa Constitución. Con años de experiencia en el
                arte de la barbería, nuestro objetivo es ofrecer un servicio
                excepcional a nuestros clientes en un ambiente relajado y
                acogedor.
              </p>
            </div>
            <div className="linea"></div>
            <div className="mision">
              <h3>Nuestra Misión</h3>
              <p>
                En Barber Duck, nuestra misión es proporcionar cortes de cabello
                y afeitados de alta calidad, combinando técnicas tradicionales
                con un toque moderno. Nos esforzamos por crear una experiencia
                única para cada cliente, garantizando que salgan de nuestra
                barbería satisfechos y con confianza.
              </p>
            </div>
          </div>
          <div className="nosotros-img"></div>

          <section className="contacto">
            <h2>Contacto</h2>

            <h3>Información de Contacto</h3>
            <ul>
              <li>Teléfono: +54 11 1234-5678</li>
              <li>Email: contacto@barberduck.com.ar</li>
              <li> Dirección: Av. Principal 123, Villa Constitución</li>
              <li>
                Horarios de Atención Lunes a Viernes: 9:00 AM - 7:00 PM Sábados:
                9:00 AM - 5:00 PM Domingos: Cerrado
              </li>
            </ul>
            <div className="redes">
              <i className="icon-facebook"></i>
              <i className="icon-mail"></i>
              <i className="icon-instagram"></i>
              <i className="icon-whatsapp"></i>
            </div>
          </section>
        </section>
      </HomePage>
    </>
  );
}

export default NosotrosPage;
