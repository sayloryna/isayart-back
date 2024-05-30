import chalk from "chalk";
import { type NextFunction, type Request, type Response } from "express";
import type ServerError from "./errors/ServerError/ServerError.js";

export const generalError = (
  error: ServerError,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  const statusCode = error.statusCode ?? 500;
  const errorMessage = error.message || "Server failed: Unknown Error";

  console.log(chalk.redBright.bold(`${errorMessage}`));

  res.status(statusCode).json({ error: `${errorMessage}` });
};
