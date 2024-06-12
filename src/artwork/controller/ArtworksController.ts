import chalk from "chalk";
import { type NextFunction, type Request, type Response } from "express";
import {
  type RequestWithArtworkData,
  type ArtworksControllerStructure,
} from "./types";
import { type ArtworksRepository } from "../repository/types";
import ServerError from "../../server/middlewares/errors/ServerError/ServerError.js";
class ArtworksController implements ArtworksControllerStructure {
  constructor(private readonly artworksRepository: ArtworksRepository) {}

  getArtworks = async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const artworks = await this.artworksRepository.getAll();

      res.status(200).json({ artworks });
    } catch (error) {
      console.log(
        chalk.bgRed.bold.white((error as { message: string }).message),
      );

      const serverError = new ServerError("Failed to find Artworks", 500);

      next(serverError);
    }
  };

  createArtwork = async (
    req: RequestWithArtworkData,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const newArtwork = await this.artworksRepository.createArtwork(req.body);

      res.status(200).json({ newArtwork });
    } catch (error) {
      const errorCode = (error as { code: number }).code;

      const serverErrorMessage =
        errorCode === 11000
          ? "Artwork already in gallery"
          : "Invalid or missing artwork data";
      const serverErrorCode = errorCode === 11000 ? 409 : 400;

      const serverError = new ServerError(serverErrorMessage, serverErrorCode);

      next(serverError);
    }
  };
}

export default ArtworksController;
