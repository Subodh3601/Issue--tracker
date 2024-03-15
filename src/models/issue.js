import mongoose from "mongoose";

const { Schema, model } = mongoose;

const issueSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    labels: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Issue = model("Issue", issueSchema);

export default Issue;
