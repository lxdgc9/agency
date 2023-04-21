import { Schema, model } from "mongoose";

interface IProf {
  attrs: {
    k: string;
    v: string;
  }[];
}

const schema = new Schema<IProf>(
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

const Prof = model<IProf>("prof", schema, "Profile");

export { Prof };
