import { type Model } from "mongoose";
import { type ArtworkData, type ArtworksRepository } from "./types.js";
import type ArtworkStructure from "../types.js";

class ArtworksMongooseRepository implements ArtworksRepository {
  constructor(public readonly model: Model<ArtworkStructure>) {}

  getAll = async (): Promise<ArtworkStructure[]> => this.model.find().exec();
  createArtwork = async (artworkData: ArtworkData): Promise<ArtworkStructure> =>
    this.model.create(artworkData);
}

export default ArtworksMongooseRepository;
