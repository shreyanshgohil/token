import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      min: 6,
      max: 18,
      required: true,
    },
    typeOfUser: {
      type: Number,
      enum: [1, 2],
      default: 2,
    },
  },
  { timestamps: true }
);
export default mongoose.model("USer", userSchema);
