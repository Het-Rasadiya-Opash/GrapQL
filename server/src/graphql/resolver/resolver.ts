import type { IBooking } from "@/models/booking.js";
import type { IListing } from "@/models/listing.js";
import {
  getAllBookings,
  getAllLikes,
  getAllListings,
  getAllReviews,
  getBookingById,
  getLikeById,
  getListingById,
  getReviewById,
} from "@/controllers/listing.js";
import { createUser, getAllUsers, getUserById } from "@/controllers/user.js";
import { IReview } from "@/models/review.js";
import { ILike } from "@/models/like.js";

type ListingParent = Pick<IListing, "owner">;
type ReviewParent = Pick<IReview, "owner" | "listing">;
type BookingParent = Pick<IBooking, "customer" | "listing">;
type LikeParent = Pick<ILike, "user" | "listing">;

export const graghQLResolver = {
  Query: {
    users: getAllUsers,
    user: getUserById,

    listings: getAllListings,
    listing: getListingById,

    bookings: getAllBookings,
    booking: getBookingById,

    reviews: getAllReviews,
    review: getReviewById,

    likes: getAllLikes,
    like:getLikeById
  },
  Mutation: {
    newUser: createUser,
  },
  Listing: {
    owner: async (listing: ListingParent) => {
      return await getUserById(null, { id: String(listing.owner) });
    },
  },
  Booking: {
    customer: async (booking: BookingParent) => {
      return await getUserById(null, { id: String(booking.customer) });
    },
    listing: async (booking: BookingParent) => {
      return await getListingById(booking.listing);
    },
  },
  Review: {
    owner: async (review: ReviewParent) => {
      return await getUserById(null, { id: String(review.owner) });
    },
    listing: async (review: ReviewParent) => {
      return await getListingById(null, { id: String(review.listing) });
    },
  },
  Like: {
    user: async (like: LikeParent) => {
      return await getUserById(null, { id: String(like.user) });
    },
    listing: async (like: LikeParent) => {
      return await getListingById(null, { id: String(like.listing) });
    },
  },
};
