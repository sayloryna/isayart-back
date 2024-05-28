import "dotenv/config";
import startServer from "./server/index.js";
import connectToDataBase from "./database/index.js";

const dataBaseUri = process.env.MONGODB_URI!;

await connectToDataBase(dataBaseUri);

const port = process.env.PORT ?? 4444;

startServer(Number(port));
