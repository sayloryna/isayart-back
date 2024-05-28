import mongoose, { Schema } from "mongoose";

const pictureSchema = new Schema({
  title: {
    type: String,
    unique: true,
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
  pictureUrl: {
    type: String,
  },
  isFavourite: {
    type: Boolean,
    default: false,
  },
  size: [
    {
      width: {
        type: Number,
      },
      height: {
        type: Number,
      },
    },
  ],
});

const Picture = mongoose.model("Picture", pictureSchema, "pictures");

export default Picture;
