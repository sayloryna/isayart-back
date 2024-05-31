import { type NextFunction, type Request, type Response } from "express";
import ServerError from "./errors/ServerError/ServerError.js";

const notFoundError = (
  _req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  const error = new ServerError("Endpoint not found", 404);

  next(error);
};

export default notFoundError;
