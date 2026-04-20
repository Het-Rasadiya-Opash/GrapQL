import mongoose from "mongoose";

export interface IReview {
  comment: string;
  rating: number;
  owner: mongoose.Types.ObjectId;
  listing: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new mongoose.Schema<IReview>(
  {
    comment: {
      type: String,
      required: [true, "Comment is Required"],
      trim: true,
    },
    rating: {
      type: Number,
      required: [true, "Rating is Required"],
      min: 1,
      max: 5,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Owner is Required"],
    },
    listing: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
      required: [true, "Listing is Required"],
    },
  },
  {
    timestamps: true,
  },
);

export const Review =
  mongoose.models.Review || mongoose.model<IReview>("Review", reviewSchema);
