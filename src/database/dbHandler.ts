import mongoose from "mongoose";
const MONGODB_URI = (process.env.MONGODB_ROUTE!);

export async function DBConnect(db = MONGODB_URI) {
  if (!db) {
    throw new Error('Mongo connection URL is not defined. Please define it in .env file.')
  }

  await mongoose.connect(db)
    .then(() =>
      console.log('MongoDB Connected'))
    .catch((error: Error) =>
      console.log(error)
    );
};

export async function DBDisconnect() {
  await mongoose.connection.close()
    .then(() =>
      console.log('MongoDB Disconnected'))
    .catch((error: Error) =>
      console.log(error)
    );
};