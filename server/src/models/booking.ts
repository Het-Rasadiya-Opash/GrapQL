import mongoose from "mongoose";

export const bookingStatuses = ["pending", "confirmed", "cancelled"] as const;

export interface IBooking {
  listing: mongoose.Types.ObjectId;
  customer: mongoose.Types.ObjectId;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  totalPrice: number;
  stayDay: number;
  status: (typeof bookingStatuses)[number];
  isPaid: boolean;
}

const bookingSchema = new mongoose.Schema<IBooking>({
  listing: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Listing",
    required: true,
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  checkIn: {
    type: Date,
    required: true,
  },
  checkOut: {
    type: Date,
    required: true,
  },
  guests: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  stayDay: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: bookingStatuses,
    default: "pending",
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
});

export const Booking =
  mongoose.models.Booking || mongoose.model<IBooking>("Booking", bookingSchema);
