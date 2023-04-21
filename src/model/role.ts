import { Schema, Types, model } from "mongoose";

interface IRole {
  name: string;
  perms: Types.ObjectId;
}

const schema = new Schema<IRole>(
  {
    name: {
      type: String,
      required: true,
    },
    perms: [
      {
        type: Schema.Types.ObjectId,
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

const Role = model<IRole>("role", schema);

export { Role };
