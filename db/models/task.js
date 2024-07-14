import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "title is required"],
    maxlength: [32, "title should be less than 32 characters"],
  },
  description: {
    type: String,
    required: [true, "description is required"],
  },
  completed: {
    type: Boolean,
    default: "false",
  },
  type:{
    type: String,
    enum: ["text", "list"],
    default: "text"
  },
  textBody: {
    type: String,
  },
  listBody: {
    type: [String]
  },
  shared:{
    type: Boolean,
    default: false
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "catgory",
    required: [true, "categoryId is required"],
  }
});

const taskModel = mongoose.model("task", taskSchema);

export default taskModel;
