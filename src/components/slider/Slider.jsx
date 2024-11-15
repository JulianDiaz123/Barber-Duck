import React, { useEffect, useState } from "react";
import "./slider.css";
function Slider({ imgList }) {
  const [imagenActual, setImagenActual] = useState(0);
  const cantidad = imgList?.length;

  if (!Array.isArray(imgList) || cantidad === 0) {
    return;
  }

  const siguienteImagen = () => {
    setImagenActual(imagenActual === cantidad - 1 ? 0 : imagenActual + 1);
  };

  const antImagen = () => {
    setImagenActual(imagenActual === 0 ? cantidad - 1 : imagenActual - 1);
  };

  return (
    <div className="slider-container">
      {imgList.map((imagen, index) => {
        return (
          <div
            key={index}
            className={imagenActual === index ? "slide active" : "slide"}
          >
            {imagenActual === index && <img src={imagen} alt="imagen" />}
          </div>
        );
      })}

      <span className="btn-ant" onClick={antImagen}>
        ⬅
      </span>
      <span className="btn-sig" onClick={siguienteImagen}>
        ➡
      </span>
    </div>
  );
}

export default Slider;
