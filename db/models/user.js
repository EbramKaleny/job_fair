import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "your first name is required"],
    minlength: [3, "your name should be more than 2 characters"],
    maxlength: [32, "your name should be less than 32 characters"],
    unique:true
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: [true, "email already exists"],
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
});

const userModel = mongoose.model("user", userSchema);

export default userModel;
