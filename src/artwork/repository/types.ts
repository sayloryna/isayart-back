import type ArtworkStructure from "../types.js";

export interface ArtworksRepository {
  getAll(): Promise<ArtworkStructure[]>;
  createArtwork(artowrkData: ArtworkData): Promise<ArtworkStructure>;
}

export type ArtworkData = Omit<ArtworkStructure, "_id" | "isFavourite">;
