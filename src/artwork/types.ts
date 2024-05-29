interface ArtworkStructure {
  _id: string;
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

export default ArtworkStructure;
