import { type NextFunction, type Request, type Response } from "express";

export interface ArtworksControllerStructure {
  getArtworks(req: Request, res: Response, next: NextFunction): void;
  createArtwork(req: Request, res: Response, next: NextFunction): void;
}

export type ResponseWithStatusJson = Pick<Response, "status" | "json">;
