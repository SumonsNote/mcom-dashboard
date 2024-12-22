import mongoose from "mongoose";

const MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING;
const cached = {};
async function connectMongo() {
  if (!MONGODB_CONNECTION_STRING) {
    throw new Error(
      "Please define the MONGODB_CONNECTION_STRING environment variable inside .env.local"
    );
  }
  if (cached.connection) {
    return cached.connection;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    cached.promise = mongoose.connect(MONGODB_CONNECTION_STRING, opts);
  }
  try {
    cached.connection = await cached.promise;
  } catch (e) {
    cached.promise = undefined;
    throw e;
  }
  return cached.connection;
}
export default connectMongo;
