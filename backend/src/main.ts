/** Express */
import express, { Express } from "express";
/** Cors */
import cors from "cors";
/** Router */
import router from "./routes";
/** Dotenv */
import dotenv from "dotenv";
/** Path */
import path from "path";

dotenv.config();

const app: Express = express();

const PORT = process.env.PORT || 8000;

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", router);

app.listen(PORT, () => {
  console.log(`Server is litening on PORT = ${PORT}`);
});
