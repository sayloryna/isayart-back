import { type NextFunction, type Request, type Response } from "express";

export interface PicturesControllerStructure {
  getPictures(req: Request, res: Response, next: NextFunction): void;
}
