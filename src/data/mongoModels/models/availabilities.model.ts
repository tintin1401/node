import mongoose from "mongoose";
import { UserModel } from "./user.model";


const availabilitiesSchema = new mongoose.Schema({
  trainerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  times: {
    type: [String],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const AvailabilitiesModel = mongoose.model(
  "Availabilities",
  availabilitiesSchema
);
