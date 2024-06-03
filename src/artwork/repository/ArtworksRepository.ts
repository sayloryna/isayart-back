import { type Model } from "mongoose";
import { type ArtworksRepository } from "./types.js";
import type ArtworkStructure from "../types.js";

class ArtworksMongooseRepository implements ArtworksRepository {
  constructor(public readonly model: Model<ArtworkStructure>) {}

  getAll = async (): Promise<ArtworkStructure[]> => this.model.find().exec();
}

export default ArtworksMongooseRepository;
