import { type NextFunction, type Request, type Response } from "express";
import { type ArtworksControllerStructure } from "./types";
import { type ArtworksRepository } from "../repository/types";
import ServerError from "../../server/middlewares/errors/ServerError/ServerError.js";
import chalk from "chalk";

class ArtworksController implements ArtworksControllerStructure {
  constructor(private readonly artworksRepository: ArtworksRepository) {}

  getArtworks = async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const artworks = await this.artworksRepository.getAll();

      res.status(200).json(artworks);
    } catch (error) {
      console.log(
        chalk.bgRed.bold.white((error as { message: string }).message),
      );

      const serverError = new ServerError("Failed to find Artworks", 500);

      next(serverError);
    }
  };
}

export default ArtworksController;
