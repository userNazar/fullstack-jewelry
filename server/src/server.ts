import app from "./app";
import env from "./utils/validateEnv";
import mongoose from "mongoose";
 
const PORT = env.PORT;

const start = async () => {
    try {
        await mongoose.connect(env.MONGO_CONNECTION_STRING);
        app.listen(PORT, () => console.log(`Server is started in port - ${PORT}`));
    } catch (e) {
        console.log(e);
    }
};

start(); 

