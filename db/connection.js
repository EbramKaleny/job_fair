import mongoose from "mongoose";

const dbConnection = () => {
  mongoose
    .connect("mongodb://localhost:27017/job_fair")
    .then((conn) => {
      console.log("connection to db success");
    })
};

export { dbConnection };
