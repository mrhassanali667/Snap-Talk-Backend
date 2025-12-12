import mongoose from "mongoose";
import dotenv from "dotenv/config";
import ENV from "../constants/index.js";
import chalk from "chalk";


mongoose.connect(`mongodb+srv://${ENV.DB_USER}:${ENV.DB_PASS}@hassancluster.7w9v4hs.mongodb.net/${ENV.DB_NAME}?appName=HassanCluster`)


mongoose.connection.on("connected", () => {
    console.log(chalk.blueBright.bold("Database connected"))

})

mongoose.connection.on("error", (error) => {
    console.log('err'.error)
})