import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    uid: {
      type: String,
      required: true,
      unique: true,
    },
    prof: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "prof",
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    toJSON: {
      transform(ret) {
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

schema.index({ uid: 1 });

const User = mongoose.model("user", schema, "User");

export default User;
