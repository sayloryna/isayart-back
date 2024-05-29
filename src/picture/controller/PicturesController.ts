import { type Request, type Response } from "express";
import { type PictureRepositoryStructure } from "../repository/types";
import { type PicturesControllerStructure } from "./types";

class PicturesController implements PicturesControllerStructure {
  constructor(private readonly picuresRepository: PictureRepositoryStructure) {}

  async getPictures(_req: Request, res: Response): Promise<void> {
    try {
      const pictures = await this.picuresRepository.getAll();
      res.status(200).json({ pictures });
    } catch (error) {
      res.status(404).json({ error: "Failed to get Pictures" });
    }
  }
}

export default PicturesController;
