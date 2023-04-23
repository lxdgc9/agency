import mongoose from "mongoose";

function runMongo(uri) {
  mongoose
    .connect(uri)
    .then(() => console.log("MongoDb connected"))
    .catch((e) => {
      console.log("MongoDb connection error:", e);
      throw e;
    });
}

export default runMongo;
