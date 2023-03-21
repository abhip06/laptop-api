import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const { connection } = await mongoose.connect(process.env.DB_URI);

        console.log(`DB Connected with ${connection.host}`);
    } catch (err) {
        console.log(err);
    }
}