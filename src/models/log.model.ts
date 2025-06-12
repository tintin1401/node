import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
  oring: {
    type: String,
  },
  level: {
    type: String,
    enum:['low', 'medium', 'high'],
    default: 'low'
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const LogModel = mongoose.model("Log", logSchema);