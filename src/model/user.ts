import { Schema, Types, model } from "mongoose";

interface IUser {
  uid: string;
  prof: Types.ObjectId;
  active: boolean;
}

const schema = new Schema<IUser>(
  {
    uid: {
      type: String,
      required: true,
      unique: true,
    },
    prof: {
      type: Schema.Types.ObjectId,
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

const User = model<IUser>("user", schema, "User");

export { User };
