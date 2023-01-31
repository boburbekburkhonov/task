import express, { Application } from "express";
import { errorMiddleware } from "./middleware/error.middleware";
import routes from "./routes";
import dataSource from "./config/ormconfig";
import cors from "cors";

const app: Application = express();

dataSource
  .initialize()
  .then((): void => console.log("Connected"))
  .catch((err: unknown) => console.log(err));

app.use(express.json());
app.use(cors());
app.use(routes);
app.use(errorMiddleware);

app.listen(9090, (): void => console.log(9090));
