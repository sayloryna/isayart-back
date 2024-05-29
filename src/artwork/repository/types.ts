import type ArtworkStructure from "../types.js";

export interface ArtworksRepositoryStructure {
  getAll(): Promise<ArtworkStructure[]>;
}
