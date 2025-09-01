const express = require("express");
const app =  express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

main().then(()=>{
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log(err)
}); 

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
};

app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

app.get("/",(req,res)=>{
    res.send("Server is running")
});

app.get("/listing", async (req,res)=>{
    const allListing = await Listing.find({});
    res.render("listings/index.ejs",{allListing})
});

app.get("/listing/new",(req,res)=>{
    res.render("listings/new.ejs");
})

app.get("/listing/:id", async (req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
});

app.post("/listing", async (req,res)=>{
    let listing = req.body.listing;
    let newListing = new Listing(listing);
    await newListing.save();
    console.log(listing)
    res.redirect("/listing");
});

app.get("/listing/:id/edit", async (req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
});

app.put("/listing/:id", async (req,res)=>{
    let {id} = req.params;
    let listing = req.body.listing;
    await Listing.findByIdAndUpdate(id, listing);
    res.redirect(`/listing/${id}`);
});

app.delete("/listing/:id", async (req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listing");
})

app.listen(8080,()=>{
    console.log("Server is running on port 8080")
});