import mongoose from "mongoose";
import { Booking } from "@/models/booking.js";
import { Listing } from "@/models/listing.js";
import { User } from "@/models/user.js";
import { Review } from "@/models/review.js";
import { Like } from "@/models/like.js";
type MongoId = string | mongoose.Types.ObjectId;

export const getAllListings = async () => {
  const listings = await Listing.find();
  return listings;
};

export const getListingById = async (
  parentOrId: unknown,
  arg?: { id: string },
) => {
  const id = (arg?.id ?? parentOrId) as MongoId;
  const listing = await Listing.findById(id);
  return listing;
};

export const getUserById = async (
  parentOrId: unknown,
  arg?: { id: string },
) => {
  const id = (arg?.id ?? parentOrId) as MongoId;
  const user = await User.findById(id);
  return user;
};

export const getAllBookings = async () => {
  const bookings = await Booking.find();
  return bookings;
};

export const getBookingById = async (
  parentOrId: unknown,
  arg?: { id: string },
) => {
  const id = (arg?.id ?? parentOrId) as MongoId;
  const booking = await Booking.findById(id);
  return booking;
};

export const getAllReviews = async () => {
  const reviews = await Review.find();
  return reviews;
};

export const getReviewById = async (
  parentOrId: unknown,
  arg?: { id: string },
) => {
  const id = (arg?.id ?? parentOrId) as MongoId;
  const review = await Review.findById(id);
  return review;
};

export const getAllLikes = async () => {
  const likes = await Like.find();
  return likes;
};

export const getLikeById = async (
  parentOrId: unknown,
  arg?: { id: string },
) => {
  const id = (arg?.id ?? parentOrId) as MongoId;

  const likes = await Like.findById(id);
  return likes;
};
