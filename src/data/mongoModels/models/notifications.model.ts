import mongoose, { Schema } from "mongoose";

const notificationSchema = new mongoose.Schema({
    trainerId:{
        type: Schema.Types.ObjectId,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    isRead : {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: new Date(),
      },
 
});

export const ReservationModel = mongoose.model("Notification", notificationSchema);