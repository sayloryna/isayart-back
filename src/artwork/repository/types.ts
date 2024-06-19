import type ArtworkStructure from "../types.js";

export interface ArtworksRepository {
  getAll(): Promise<ArtworkStructure[]>;
  createArtwork(artworkData: ArtworkData): Promise<ArtworkStructure>;
  updateArtwork(
    artworkId: string,
    modification: Partial<ArtworkStructure>,
  ): Promise<ArtworkStructure>;
  deleteById(artworkId: string): Promise<ArtworkStructure | Error>;
  getById(artworkId: string): Promise<ArtworkStructure | Error>;
}

export type ArtworkData = Omit<ArtworkStructure, "_id" | "isFavourite">;
