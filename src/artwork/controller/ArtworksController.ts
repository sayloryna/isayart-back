import { type Request, type Response } from "express";
import { type ArtworksControllerStructure } from "./types";
import { type ArtworksRepositoryStructure } from "../repository/types";

class ArtworksController implements ArtworksControllerStructure {
  constructor(
    private readonly artworksRepository: ArtworksRepositoryStructure,
  ) {}

  getArtworks = async (_req: Request, res: Response): Promise<void> => {
    try {
      const artworks = await this.artworksRepository.getAll();

      res.status(200).json(artworks);
    } catch (error) {
      res.status(404).json({ error: "Failed to get artworks" });
    }
  };
}

export default ArtworksController;
