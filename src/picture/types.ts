export interface PictureStructure {
  title: string;
  author: string;
  description: string;
  date: string;
  pictureUrl: string;
  size: {
    width: number;
    heigtht: number;
  };
  isFavourite: boolean;
}
