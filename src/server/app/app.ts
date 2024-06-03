import express from "express";
import artworkRouter from "../../artwork/router/artworkRouter.js";
import notFoundError from "../middlewares/notFoundError.js";
import { generalError } from "../middlewares/generalError.js";
import routes from "../routes/routes.js";
import cors from "cors";
import morgan from "morgan";

const app = express();
app.use(morgan("dev"));

app.use(
  cors({
    origin: (process.env.ORIGIN ?? "").split(","),
  }),
);

app.use(routes.artworks, artworkRouter);

app.use(notFoundError);
app.use(generalError);

export default app;
