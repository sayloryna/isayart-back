import express from "express";
import artworkRouter from "../../artwork/router/artworkRouter.js";
import notFoundError from "../middlewares/notFoundError.js";
import { generalError } from "../middlewares/generalError.js";
import routes from "../routes/routes.js";
import cors from "cors";

const app = express();
app.use(cors());

app.use(routes.artworks, artworkRouter);

app.use(notFoundError);
app.use(generalError);

export default app;
