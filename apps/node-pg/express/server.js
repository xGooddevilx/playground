import app from "./app.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({ path: "./.config.env" });

const PORT = process.env.PORT;

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

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
