import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema(
  {
    tokenColor: {
      type: String,
      required: true,
      unique: true,
    },
    tokenName: {
      type: String,
      required: true,
      unique: true,
    },
    tokenPrice: {
      type: Number,
      required: true,
    },
    totalTokenQuantity: {
      type: Number,
      required: true,
    },
    availableTokenQuantity: {
      type: Number,
      required: true,
    },
    typeOfToken: {
      type: Number,
      required: true,
      enum: [0, 1],
    },
    tokenCreator: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Token", tokenSchema);
