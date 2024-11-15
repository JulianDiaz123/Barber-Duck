import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // Reemplaza con la URL de tu frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/api/productos", (req, res) => {
  res.json({ message: "Hola desde el servidor!" });
});

app.listen(7219, () => {
  console.log("Servidor corriendo en http://localhost:7219");
});
