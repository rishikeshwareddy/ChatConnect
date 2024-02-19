import mongoose from "mongoose";

const connecttoMOngoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("mongodb connected");
    }
    catch (error) {
        console.log("Error connecting to MongoDB", error.message);
    }
}
export default connecttoMOngoDB;