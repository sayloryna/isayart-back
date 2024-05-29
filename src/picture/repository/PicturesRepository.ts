import { type Model } from "mongoose";
import { type PictureRepositoryStructure } from "./types";
import { type PictureStructure } from "../types.js";

class PictureRepository implements PictureRepositoryStructure {
  constructor(private readonly model: Model<PictureStructure>) {}

  getAll = async (): Promise<PictureStructure[]> => {
    try {
      return await this.model.find().exec();
    } catch (error) {
      console.log((error as Error).message);
      throw error;
    }
  };
}

export default PictureRepository;
