import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config();

const mongodbURL = process.env.MONGO_DB_URL

const connectToMongo = () => {
    mongoose.connect(mongodbURL);
    console.log("Successfully connected to MongoDB")
}


export default connectToMongo;

