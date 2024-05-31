import express from "express";
import artworkRouter from "../../artwork/router/artworkRouter.js";
import notFoundError from "../middlewares/notFoundError.js";
import { generalError } from "../middlewares/generalError.js";
import routes from "../routes/routes.js";

const app = express();

app.use(routes.artworksRoute, artworkRouter);

app.use(notFoundError);
app.use(generalError);

export default app;
