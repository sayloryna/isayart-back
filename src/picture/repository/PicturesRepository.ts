import { type Model } from "mongoose";
import { type PictureRepositoryStructure } from "./types";
import { type PictureStructure } from "../types.js";

class PictureRepository implements PictureRepositoryStructure {
  constructor(private readonly model: Model<PictureStructure>) {}

  getAll = async (): Promise<void> => {
    await this.model.find().exec();
  };
}

export default PictureRepository;
