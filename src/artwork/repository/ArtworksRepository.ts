import { type Model } from "mongoose";
import { type ArtworksRepositoryStructure } from "./types.js";
import type ArtworkStructure from "../types.js";

class ArtworksRepository implements ArtworksRepositoryStructure {
  constructor(public readonly model: Model<ArtworkStructure>) {}

  getAll = async (): Promise<ArtworkStructure[]> => {
    try {
      return await this.model.find().exec();
    } catch (error) {
      console.log((error as Error).message);
      throw error;
    }
  };
}

export default ArtworksRepository;
