import type ArtworkStructure from "../types.js";

export interface ArtworksRepository {
  getAll(): Promise<ArtworkStructure[]>;
  createArtwork(artworkData: ArtworkData): Promise<ArtworkStructure>;
}

export type ArtworkData = Omit<ArtworkStructure, "_id" | "isFavourite">;
