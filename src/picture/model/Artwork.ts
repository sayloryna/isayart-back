import mongoose, { Schema } from "mongoose";

const artworkSchema = new Schema({
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
  isFavourite: {
    type: Boolean,
    default: false,
  },
  size: {
    type: {
      width: {
        type: Number,
      },
      height: {
        type: Number,
      },
    },
  },
});

const Artwork = mongoose.model("Artwork", artworkSchema, "pictures");

export default Artwork;
