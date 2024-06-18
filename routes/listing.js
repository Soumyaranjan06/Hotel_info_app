const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner,validateListing}=require("../middleware.js");
const listingController=require("../controllers/listing.js");
const multer  = require('multer');
const {storage}=require("../cloudConfig.js");
const Listing = require("../models/listing.js");
const upload = multer({storage});

router
.route("/")
.get(
wrapAsync(listingController.index)
)
.post(isLoggedIn,
  upload.single('listing[image]'),
  validateListing
  ,wrapAsync(listingController.creatListing));

// New Route
router.get(
"/new",
 isLoggedIn,
listingController.renderNewform
);
  
// Show route
router.get(
"/:id",
wrapAsync(listingController.showListing)
);
  
//Edit Route
  router.get(
    "/:id/edit",
    isLoggedIn,isOwner,
    wrapAsync(listingController.renderEditfrom)
    );
  
// update rote
router.put("/:id",
isLoggedIn,isOwner,  upload.single('listing[image]'),validateListing, 
wrapAsync(listingController.updateListing)
);

 // delete route
router.delete("/:id",
isLoggedIn,
isOwner,wrapAsync(listingController.deleteListing)
 );

 

  module.exports=router;