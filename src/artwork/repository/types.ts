import { type ArtworkStructure } from "../types";

export interface ArtworksRepositoryStructure {
  getAll(): Promise<ArtworkStructure[]>;
}
