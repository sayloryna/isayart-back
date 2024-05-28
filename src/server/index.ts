import chalk from "chalk";

import app from "./app/app.js";

const startServer = (port: number) => {
  app.listen(port, () => {
    console.log(chalk.green(`Listening at http://localhost:${port}`));
  });
};

export default startServer;
