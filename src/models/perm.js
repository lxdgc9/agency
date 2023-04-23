import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    sign: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
    },
    permGr: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "perm-gr",
    },
  },
  {
    collection: "Permission",
    toJSON: {
      virtuals: true,
      transform(ret) {
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

schema.index({ createdAt: -1 });

const Perm = model("perm", schema);

export default Perm;
