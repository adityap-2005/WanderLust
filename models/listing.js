const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title : {
        type :String,
        required : true
    },
    description : String,
    image : {
        filename : String,
        url: {
        type : String,
        default : "https://a0.muscache.com/im/pictures/prohost-api/Hosting-48246770/original/6cdeb0e7-efbd-49f6-b202-a07181f8990f.jpeg?im_w=720",
        set : (v) => v===""
        ? "https://a0.muscache.com/im/pictures/prohost-api/Hosting-48246770/original/6cdeb0e7-efbd-49f6-b202-a07181f8990f.jpeg?im_w=720"
        : v,
    }},
    price : Number,
    location : String,
    country : String
});

const Listing = mongoose.model ("Listing", listingSchema);
module.exports = Listing;