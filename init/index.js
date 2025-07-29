const Listing=require("../models/listing.js");
const initdata=require("./data.js");
const mongoose = require('mongoose');
const URL="mongodb://127.0.0.1:27017/wanderlust";

main().
then(()=>{
  console.log("server is connected");
}).catch((err)=>{
  console.log(err);
})
async function main() {
  await mongoose.connect(URL);
}

const initDb=async()=>{
    await Listing.deleteMany({});
    initdata.data = initdata.data.map((obj) => ({
    ...obj,
    owner: "6883c16002d3c0841d4e418a",
    }));

    await Listing.insertMany(initdata.data);
    console.log("data was initialized");
}
initDb();
