import express, { Express } from "express";
import morgan from "morgan";
import sequelize from "./db/connection";
import albumController from "./controllers/albumController";
import artistController from "./controllers/artistController";


const app: Express = express();

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to PostgreSQL");
  })
  .catch((error) => {
    console.log("Error connecting to PostgreSQL:", error);
  });

app.use(express.json());
app.use(morgan("dev"))

app.use("/api/artists", artistController);
app.use("/api/albums", albumController);

export default app;
