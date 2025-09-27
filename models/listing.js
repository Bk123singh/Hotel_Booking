const mongoose=require('mongoose');
const Review=require("./review.js");
const { string } = require('joi');

const Schema=mongoose.Schema;

const listingSchema=new Schema({
    title:{
        type:String,
        required:true,
    },
    description:String,

    Image:{
       url:String,
       filename:String,
    },
    price:Number,
    keyFeatures: [String],   
    location:String,
    country:String,
    latitude: Number,
    longitude: Number,
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review"
        }
    ],
    likes: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
],
    owner:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }
});

listingSchema.post("findOneAndDelete", async (listing)=>{
    if(listing){
        await Review.deleteMany({_id:{$in: listing.reviews}})
    }
})

const listing =mongoose.model("listing", listingSchema);

module.exports=listing;
