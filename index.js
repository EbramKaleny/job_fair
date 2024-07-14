import express from "express";
import UR from "./routes/user.js";
import CR from "./routes/category.js";
import TR from "./routes/task.js";
import { dbConnection } from "./db/connection.js";

dbConnection();
const app = express();
app.use(express.json());

app.use("/users", UR);
app.use("/categories", CR);
app.use("/tasks", TR);

app.all("*", (req, res, next) => {
  next(new appError("page not found", 404));
});

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({ msg: "error", err: err.message });
});

app.listen(8000, () => {
  console.log("app listening on port 8000");
});
