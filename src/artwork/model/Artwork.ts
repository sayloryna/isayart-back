import mongoose, { Schema } from "mongoose";
import type ArtworkStructure from "../types";

const artworkSchema = new Schema<ArtworkStructure>({
  title: {
    type: String,
    unique: true,
    required: true,
  },
  author: {
    type: String,
  },
  description: {
    type: String,
  },
  date: {
    type: String,
  },

  artworkUrl: {
    type: String,
    required: true,
  },
  size: {
    width: Number,
    height: Number,
  },

  isFavourite: {
    type: Boolean,
    default: false,
  },
});

const Artwork = mongoose.model("Artwork", artworkSchema, "artworks");

export default Artwork;