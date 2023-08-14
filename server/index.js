import express from "express";
import cors from "cors";
import { fileURLtoPath } from "url";
import { sequelize } from "./config/mysql.config.js";
//agregar rutas

const app = express();

const __filename = fileURLtoPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port = 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(cors());

//rutas

async function main() {
  try {
    await sequelize.sync();
    console.log("Conexión con la base de datos exitosa");
    app.listen(port, () => {
      console.log(`Conexión con el puerto ${port} establecida exitosamente`);
    });
  } catch (err) {
    console.log(
      "Error al establecer una conexión con la base de datos o el servidor",
      err
    );
  }
}

main();
