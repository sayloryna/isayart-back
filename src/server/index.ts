import "dotenv/config";
import startServer from "./app/app.js";

const port = process.env.PORT ?? 4444;

startServer(Number(port));
