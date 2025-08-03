import fs from "fs";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Tour from "../models/tour/tourModel.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: "../.config.env" });

const isLocal = process.env.IS_LOCAL;
console.log(process.env.PORT);

const dbUrl = isLocal
  ? process.env.DATABASE_URL_LOCAL
  : process.env.DATABASE_URL.replace(
      "<PASSWORD>",
      process.env.DATABASE_PASSWORD
    );

mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB successfully");
  })
  .catch(err => {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, "utf-8")
);

const importTourData = async () => {
  try {
    await Tour.create(tours);
    console.log("Data Injected successfully!");
  } catch (error) {
    console.log("Injection failed");
    console.log(error);
  } finally {
    process.exit();
  }
};

const deleteTourData = async () => {
  try {
    await Tour.deleteMany();
    console.log("Data deleted successfully!");
  } catch (error) {
    console.log("deleting failed");
    console.log(error);
  } finally {
    process.exit();
  }
};

if (process.argv[2] === "--import") importTourData();
else if (process.argv[2] === "--delete") deleteTourData();
