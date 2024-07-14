import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "your first name is required"],
    minlength: [3, "your name should be more than 2 characters"],
    maxlength: [32, "your name should be less than 32 characters"],
  },
  ownerId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"user",
    required: [true, "ownerId is required"]
  }
});

const categoryModel = mongoose.model("category", categorySchema);

export default categoryModel;
