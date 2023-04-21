import { Schema, Types, model } from "mongoose";

interface IPerm {
  name: string;
  sign: string;
  desc: string;
  permGr: Types.ObjectId;
}

const schema = new Schema<IPerm>(
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
      type: Schema.Types.ObjectId,
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

const Perm = model<IPerm>("perm", schema);

export { Perm };
