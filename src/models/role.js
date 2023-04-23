import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    perms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "perm",
        required: true,
      },
    ],
  },
  {
    collection: "Role",
    timestamps: true,
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

const Role = mongoose.model("role", schema);

export default Role;
