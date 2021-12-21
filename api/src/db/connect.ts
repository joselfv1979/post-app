import mongoose from "mongoose";

const { MONGO_DB_URI, MONGO_DB_URI_TEST, NODE_ENV } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

const connectionString = NODE_ENV === "test" ? MONGO_DB_URI_TEST : MONGO_DB_URI;

if (!connectionString) {  
  console.error("Remember to have environment variables on a  file .env");
}

//connection mongodb atlas
export const connect = () => {
  mongoose
    .connect(connectionString, options)
    .then(() => console.log("Database connected!"))
    .catch((err) => console.log(err));
};

process.on("uncaughtException", (error) => {
  console.error(error);
  mongoose.disconnect();
});
