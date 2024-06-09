import express from "express";
import cors from "cors";
import morgan from "morgan";
import artworkRouter from "../../artwork/router/artworkRouter.js";
import notFoundError from "../middlewares/notFoundError.js";
import { generalError } from "../middlewares/generalError.js";
import routes from "../routes/routes.js";

const app = express();
app.disable("x-powered-by");

app.use(morgan("dev"));
app.use(express.json());

app.use(
  cors({
    origin: (process.env.ORIGINS ?? "").split(","),
  }),
);

app.use(routes.artworks, artworkRouter);

app.use(notFoundError);
app.use(generalError);

export default app;
