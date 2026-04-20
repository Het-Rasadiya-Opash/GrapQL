import mongoose from "mongoose";

export const listingCategories = [
  "rooms",
  "beachfront",
  "cabins",
  "trending",
  "city",
  "countryside",
] as const;

export interface IListing {
  title: string;
  description?: string;
  price: number;
  images: string[];
  location: string;
  category: (typeof listingCategories)[number];
  geometry: {
    type: "Point";
    coordinates: number[];
  };
  owner: mongoose.Types.ObjectId;
  reviews: mongoose.Types.ObjectId[];
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

const listingSchema = new mongoose.Schema<IListing>(
  {
    title: {
      type: String,
      required: [true, "Title is Required"],
      index: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is Required"],
    },
    images: {
      type: [String],
      required: [true, "Image is Required"],
    },
    location: {
      type: String,
      required: [true, "Location is Required"],
      trim: true,
    },
    category: {
      type: String,
      enum: {
        values: [...listingCategories],
        message: "Invalid category",
      },
      default: "rooms",
      index: true,
    },
    geometry: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Owner is Required"],
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

export const Listing =
  mongoose.models.Listing || mongoose.model<IListing>("Listing", listingSchema);
