import express from "express";
import artworkRouter from "../../artwork/router/artworkRouter.js";

const app = express();

app.use("/obras", artworkRouter);

export default app;
