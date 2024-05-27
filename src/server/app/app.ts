import express from "express";
import chalk from "chalk";

const app = express();

app.listen();

const startServer = (port: number) => {
  app.listen(port, () => {
    console.log(chalk.green(`Listening at http://localhost:${port}`));
  });
};

export default startServer;
