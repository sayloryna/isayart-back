import mongoose, { Schema } from "mongoose";

const pictureSchema = new Schema({
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
  pictureUrl: {
    type: String,
    required: true,
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
