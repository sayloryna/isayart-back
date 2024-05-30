import { type NextFunction, type Request, type Response } from "express";
import { type ArtworksControllerStructure } from "./types";
import { type ArtworksRepositoryStructure } from "../repository/types";
import ServerError from "../../server/middlewares/errors/ServerError/ServerError";

class ArtworksController implements ArtworksControllerStructure {
  constructor(
    private readonly artworksRepository: ArtworksRepositoryStructure,
  ) {}

  getArtworks = async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const artworks = await this.artworksRepository.getAll();

      res.status(200).json(artworks);
    } catch (error) {
      const serverError = new ServerError((error as Error).message, 404);

      next(serverError);
    }
  };
}

export default ArtworksController;
