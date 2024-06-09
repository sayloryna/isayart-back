import { type NextFunction, type Request, type Response } from "express";
import { type ArtworkData } from "../repository/types";

export interface ArtworksControllerStructure {
  getArtworks(req: Request, res: Response, next: NextFunction): void;
  createArtwork(req: Request, res: Response, next: NextFunction): void;
}

export type ResponseWithStatusJson = Pick<Response, "status" | "json">;

export type RequestWithArtworkData = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  ArtworkData
>;
