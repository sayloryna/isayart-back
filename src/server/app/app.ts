import express from "express";
import chalk from "chalk";

const app = express();

const startServer = (port: string) => {
  app.listen(port, () => {
    console.log(chalk.green(`Listening at http://localhost:${port}`));
  });
};

export default startServer;
