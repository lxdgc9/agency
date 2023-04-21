import { connect as _connect } from "mongoose";

function connect(uri: string) {
  _connect(uri)
    .then(() => console.log("MongoDb connected"))
    .catch((err) => {
      console.log("MongoDb connection error:", err);
      throw err;
    });
}

export { connect };
