import mongoose from "mongoose";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

//connection mongodb atlas
export const connect = () => {
  mongoose
    .connect(process.env.MONGO_DB_URI, options)
    .then(() => console.log("Database connected!"))
    .catch((err) => console.log(err));
};

process.on('uncaughtException', error => {
    console.error(error)
    mongoose.disconnect();
});
