const express=require("express");
const app=express();
const port=8080;
const methodOverride = require("method-override"); 
const Listing=require("./models/listing.js");
const path=require("path");
const ejsMate=require("ejs-mate");
const {isLoggedIn, isOwner, isReviewAuthor}=require(".//middleware.js");
const {saveRedirectUrl}=require("./middleware.js");

const mongoose = require('mongoose');
const mongodbUrl="mongodb://127.0.0.1:27017/wanderlust";
// const mongodbUrl = "mongodb+srv://dwivedipadmesh9:PjuMF1Jnpy87ClYB@cluster0.hoagq6k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(mongodbUrl)
  .then(() => console.log('DB connected'))
  .catch((err) => console.error('DB connection error:', err));

app.use(express.urlencoded({ extended: true }));
const Review=require("./models/reviews.js");
const session=require("express-session");
const MongoStore = require('connect-mongo');
const flash=require("connect-flash");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");

app.use(methodOverride('_method'));

const store=MongoStore.create({
  mongoUrl:mongodbUrl,
  crypto:{
    secret:"mysupersecretcode"
  },
  touchAfter: 24*3600,
})
store.on("error",()=>{
  console.log("Error in Mongo Atlas Store",err);
})
const sessionOptions = {
  store,
  secret: "mysupersecretcode",
  resave: false,
  saveUninitialized: true,
  cookie:{
    expires:Date.now()+7*24*60*60*1000,
    maxAge:7*24*60*60*1000,
    httpOnly:true
  },
};

app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
  res.locals.success=req.flash("success");
  res.locals.error=req.flash("error");
  res.locals.currUser=req.user;
  next();
})

main().
then(()=>{
  console.log("server is connected");
}).catch((err)=>{
  console.log(err);
})
async function main() {
  await mongoose.connect(mongodbUrl);
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.engine("ejs",ejsMate);
// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));
// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});

// login
app.get("/demouser",async (req,res)=>{
  let fakeUser=new User({
    email:"ramh@gmail.com",
    username:"student"
  })
  let newUser=await User.register(fakeUser,"Hello World");
  res.send(newUser);
})
app.get("/signup",(req,res)=>{
  res.render("users/signup.ejs");
})
app.post("/signup",async (req,res)=>{
  try{
     let {username,email,password}=req.body;
   const newUser= new User({email,username});
   const registerUser= await User.register(newUser,password);
   console.log(registerUser);
   req.logIn(registerUser,(err)=>{
    if(err){
        return next(err);
    }
    flash("success","User Registered Successfully!");
    res.redirect("/listings");
   })
  }catch(er){
    req.flash("error","User is Already Registered");
    res.redirect("/signup");
    console.log(er);
  }
})
app.get("/login",(req,res)=>{
  res.render("users/login.ejs");
})
app.get("/logout",(req,res,next)=>{
  req.logOut((err)=>{
    if(err){
      return next(err);
    }
    req.flash("success","you are logged out!");
    res.redirect("/listings");
  })
})
app.post("/login",saveRedirectUrl,
   passport.authenticate("local",{failureRedirect:'/login',
    failureFlash:true
   }),
   async (req,res)=>{
    req.flash("success","Welcome to Wanderlust: You are logged in");
    let redirectUrl=res.locals.redirectUrl||"/listings";
    res.redirect(redirectUrl);
})

app.post("/listings",isLoggedIn,async (req,res,next)=>{
  try{
    let listing=req.body; 
    // const newListing=new Listing(req.body.listing);
    const newListing = new Listing(req.body);
    newListing.owner=req.user._id;
    await newListing.save();
    req.flash("success","New Listing Created!");
    res.redirect("/listings");
  }catch(err){
    next(err);
  }
})
app.get("/listings",async (req,res)=>{
  let alllistings=await Listing.find({});
  // console.log(alllistings);
  // res.send("Listening round");
  // console.log(alllistings);
  // for(let listing of alllistings){
  //   console.log(listing.Image);
  // }
  // console.log(alllistings[0].Image);
  // console.log(alllistings[0].title);
  res.render("listings/index.ejs",{alllistings});
})
//new route
app.get("/listings/new",isLoggedIn,(req,res)=>{
  console.log(req.user);
  res.render("listings/new.ejs");
})
// show route
app.get("/listings/:id", async (req, res) => {
  try {
    let { id } = req.params;

    const listing = await Listing.findById(id).populate({path:"reviews",
      populate:{
        path:"author"
      }
    }).populate("owner");

    if (!listing) {
      return res.status(404).send("Listing not found");
    }

    // console.log(listing.reviews);
    res.render("listings/show.ejs", { listing });

  } catch (err) {
    console.error("Error fetching listing:", err);
    res.status(500).send("Something went wrong while fetching the listing.");
  }
});

// Delete route for comment
app.delete("/listings/:id/reviews/:reviewId",isLoggedIn,isReviewAuthor,async (req,res)=>{
  let {id,reviewId}=req.params;
  await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
  await Review.findByIdAndDelete(reviewId);
  req.flash("success","New Listing Deleted!");
  res.redirect(`/listings/${id}`);
})
app.get("/listings/:id/edit", isLoggedIn,isOwner, async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit", { listing });
});
app.put("/listings/:id",isLoggedIn,isOwner, async (req,res)=>{
  let {id}=req.params;
  await Listing.findByIdAndUpdate(id,{...req.body.listing});
  req.flash("success","Listing Updated!");
  res.redirect("/listings");
})
app.delete("/listings/:id",isLoggedIn,isOwner,async (req,res)=>{
  let {id}=req.params;
  let deletedListing=await Listing.findByIdAndDelete(id);
  req.flash("success","Listing Deleted!");
  console.log(deletedListing);
  res.redirect("/listings");
})
// Reviews Post Route
app.post("/listings/:id/reviews",isLoggedIn, async (req, res) => {
  let listing = await Listing.findById(req.params.id);
  let newReveiew=new Review(req.body.review);
  newReveiew.author=req.user._id;
  listing.reviews.push(newReveiew);
  await newReveiew.save();
  await listing.save();
  console.log("new Review Saved");
  res.redirect(`/listings/${listing._id}`);
});


app.get("/testListing",async (req,res)=>{
    // let samplesListing=new Listing({
    //   title:"My New Villa",
    //   description:"By the beach",
    //   price:1200,
    //   location:"Caloungate, Goa",
    //   country:"India"
    // });
    await samplesListing.save();
    res.send("succesfullly created");
})
app.use((err,req,res,next)=>{
   console.error("🔥 ERROR OCCURRED:", err.stack);  
  res.send("something went wrong");
})
// Home route
// app.get("/", (req, res) => {
//   res.send("🏠 Home route is established");
// });