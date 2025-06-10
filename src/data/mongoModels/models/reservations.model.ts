import mongoose , { Schema } from "mongoose";

const reservationSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  trainerId: {
    type: Schema.Types.ObjectId,
    required: true,
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
    default: new Date(),
  },
});

export const ReservationModel = mongoose.model("Reservation", reservationSchema);