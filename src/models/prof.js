import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    attrs: [
      {
        k: String,
        v: String,
      },
    ],
  },
  {
    toJSON: {
      transform: (ret) => {
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

schema.index({ k: 1, v: 1 });

const Prof = mongoose.model("prof", schema, "Profile");

export default Prof;
