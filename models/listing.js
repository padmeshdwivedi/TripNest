const mongoose=require("mongoose");
const reviews = require("./reviews");
const Review=require("./reviews.js");
const Schema=mongoose.Schema;

const listingSchema=new Schema({
    title:{
        type:String,
        require:true,
    },
    description:String,
    image: {
    type: String,
    default: "https://images.unsplash.com/photo-1560347876-aeef00ee58a1",
    set: (v) => v === "" ? "https://images.unsplash.com/photo-1560347876-aeef00ee58a1" : v,
    },
    price:Number,
    location:String,
    country:String,
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }

});

listingSchema.post("findOneAndDelete",async (listing)=>{
   if(listing){
     await Review.deleteMany( {_id:{$in:listing.reviews}});
   }
})
const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;