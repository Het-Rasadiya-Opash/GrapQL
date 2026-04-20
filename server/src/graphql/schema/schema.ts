export const graphQLSchema = `#graphql
type User{
    _id:ID!
    username:String!
    email:String!
    password:String
    admin:Boolean!
    createdAt:String!
    updatedAt:String!
}

enum ListingCategory{
    rooms
    beachfront
    cabins
    trending
    city
    countryside
}

type ListingGeometry{
    type:String!
    coordinates:[Float!]!
}

type Listing{
    _id:ID!
    title:String!
    description:String
    price:Float!
    images:[String!]!
    location:String!
    category:ListingCategory!
    geometry:ListingGeometry!
    owner:User!
    reviews:[Review!]
    views:Int!
    createdAt:String!
    updatedAt:String!
}

enum BookingStatus{
    pending
    confirmed
    cancelled
}

type Booking{
    _id:ID!
    listing:Listing!
    customer:User!
    checkIn:String!
    checkOut:String!
    guests:Int!
    totalPrice:Float!
    stayDay:Int!
    status:BookingStatus!
    isPaid:Boolean!
}

type Review{
    _id:ID!
    comment:String!
    rating:Float!
    owner:User!
    listing:Listing!
    createdAt:String!
    updatedAt:String!
}

type Like{
    _id:ID!
    listing:Listing!
    user:User!
}

input NewUserInput{
    username:String!
    email:String!
    password:String
    admin:Boolean
}


type Mutation{
    newUser(input:NewUserInput!):User!
}

type Query{
    users:[User]
    user(id:ID!):User

    listings:[Listing]
    listing(id:ID!):Listing

    bookings:[Booking]
    booking(id:ID!):Booking

    reviews:[Review]
    review(id:ID!):Review

    likes:[Like]
    like(id:ID!):Like
}
`;
