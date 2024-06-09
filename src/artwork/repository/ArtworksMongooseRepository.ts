import { type Model } from "mongoose";
import { type ArtworkData, type ArtworksRepository } from "./types.js";
import type ArtworkStructure from "../types.js";

class ArtworksMongooseRepository implements ArtworksRepository {
  constructor(public readonly model: Model<ArtworkStructure>) {}

  async getAll(): Promise<ArtworkStructure[]> {
    return this.model.find().exec();
  }

  async createArtwork(artworkData: ArtworkData): Promise<ArtworkStructure> {
    return this.model.create(artworkData);
  }
}

export default ArtworksMongooseRepository;
