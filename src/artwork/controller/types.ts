import { type NextFunction, type Request, type Response } from "express";
import { type ArtworkData } from "../repository/types";
import type ArtworkStructure from "../types";

export interface ArtworksControllerStructure {
  getArtworks(req: Request, res: Response, next: NextFunction): void;
  createArtwork(req: Request, res: Response, next: NextFunction): void;
  updateArtwork(req: Request, res: Response, next: NextFunction): void;
  deleteArtworkById(req: Request, res: Response, next: NextFunction): void;
  getArtworkById(req: Request, res: Response, next: NextFunction): void;
}

export type ResponseWithStatusJson = Pick<Response, "status" | "json">;

export type RequestWithArtworkData = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  ArtworkData
>;

export type RequestWithArtworkIdParameter = Request<{ artworkId: string }>;

export type RequestWithUpdateArtworkData = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  UpdateArtworkData
>;
export interface UpdateArtworkData {
  _id: string;
  update: Partial<ArtworkStructure>;
}
