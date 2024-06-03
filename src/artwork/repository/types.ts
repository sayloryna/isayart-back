import type ArtworkStructure from "../types.js";

export interface ArtworksRepository {
  getAll(): Promise<ArtworkStructure[]>;
}
