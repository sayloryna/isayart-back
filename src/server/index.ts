import "dotenv/config";
import startServer from "./app/app.js";

const port = process.env.PORT ?? "3033";

startServer(port);
