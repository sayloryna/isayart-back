export interface ArtworkStructure {
  title: string;
  author: string;
  description: string;
  date: string;
  artworkUrl: string;
  size: {
    width: number;
    heigtht: number;
  };
  isFavourite: boolean;
}
