import { type PictureStructure } from "../types";

export interface PictureRepositoryStructure {
  getAll(): Promise<PictureStructure[]>;
}
