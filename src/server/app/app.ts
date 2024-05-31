import express from "express";
import artworkRouter from "../../artwork/router/artworkRouter.js";
import notFoundError from "../middlewares/notFoundError.js";
import { generalError } from "../middlewares/generalError.js";

const app = express();

app.use("/artworks", artworkRouter);

app.use(notFoundError);
app.use(generalError);

export default app;
