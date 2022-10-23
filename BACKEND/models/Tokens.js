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
    freeTokenquantity: {
      type: Number,
      default: 0,
    },
    paidTokenquantity: {
      type: Number,
      default: 0,
    },
    paidTokenPrice: {
      type: Number,
      required: true,
    },
    tokenBuyerName: {
      type: String,
      required: true,
    },
    tokenCreator: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Token", tokenSchema);
