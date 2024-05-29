import { type NextFunction, type Request, type Response } from "express";

export interface ArtworksControllerStructure {
  getArtworks(req: Request, res: Response, next: NextFunction): void;
}
