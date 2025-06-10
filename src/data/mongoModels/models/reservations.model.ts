import mongoose , { Schema } from "mongoose";

const reservationSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  trainerId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending',
  },
   paymentMethod: {
    type: String,
    enum: ['sinpe', 'efectivo'],
  },
  createdAt: {
    type: Date,
    default:  Date.now,
  },
});

export const ReservationModel = mongoose.model("Reservation", reservationSchema);