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

  async updateArtwork(
    artworkId: string,
    update: Partial<ArtworkStructure>,
  ): Promise<ArtworkStructure> {
    const filter = artworkId;

    const updatedArtwork = await this.model.findByIdAndUpdate(filter, update, {
      new: true,
    });

    if (!updatedArtwork) {
      throw new Error(`Could not modify artwork with ID: ${artworkId}`);
    }

    return updatedArtwork;
  }

  async deleteById(artworkId: string): Promise<ArtworkStructure> {
    const deletedArtwork = await this.model.findByIdAndDelete(artworkId).exec();

    if (!deletedArtwork) {
      throw new Error(`Could not find artwork with ID: ${artworkId}`);
    }

    return deletedArtwork;
  }

  async getById(artworkId: string): Promise<ArtworkStructure> {
    const artwork = await this.model.findById(artworkId).exec();

    if (!artwork) {
      throw new Error(`Could not find artwork with ID: ${artworkId}`);
    }

    return artwork;
  }
}

export default ArtworksMongooseRepository;
