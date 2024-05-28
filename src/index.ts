import "dotenv/config";
import startServer from "./server/index.js";

const port = process.env.PORT ?? 4444;

startServer(Number(port));
