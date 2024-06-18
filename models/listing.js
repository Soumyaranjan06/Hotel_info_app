const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const Review=require("./review.js");

let defaultLink = "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60";

const listingSchema= new Schema({
title:{
    type:String,
    required:true,
},
description:{
    type:String
},
image:{
    filename:{
        type: String,
      required: true,
      },
    url: {
      type: String,
      required: true,
},

},
price:{
   type:Number
},
location:{
    type:String
},
country:{
    type:String
},
reviews:[ { 
    type:Schema.Types.ObjectId,
    ref:"review",
}],
owner:{
    type:Schema.Types.ObjectId,
    ref:"User"
},
geometry:{
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
    },
   // category:{
    //     type:String,
    //     enum:["Mountain","Arctic","Farms","Desetrs"],
    //     required:true,

    // }
});

listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id:{$in:listing.reviews}});
    }
});

const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;

