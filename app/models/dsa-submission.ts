import { Schema, model, models } from "mongoose";

const DsaSubSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required!"],
  },
  csiId: {
    type: Number,
    required: [true, "CSI Id is required"],
  },
  questionNumber: {
    type: Number,
    required: [true, "Question Number is required"],
  },
  time: {
    type: Number,
    required: [true, "Time is required"],
  },
  memory: {
    type: Number,
    required: [true, "Memory is required"],
  },
  code: {
    type: String,
    required: [true, "Code is required"],
  },
  image: {
    type: String,
    required: [true, "Image is required"],
  },
  timestamp: { type: Date, default: Date.now },
});

const DsaSubmission =
  models.DsaSubmission || model("DsaSubmission", DsaSubSchema);
export default DsaSubmission;
