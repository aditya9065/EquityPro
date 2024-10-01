const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');

const PORT = process.env.PORT || 8080;
const URL = process.env.MONGO_URL;


app.listen(PORT, async () => {
    console.log("listening...")
    await mongoose.connect(URL)
    .then(()=>{
        console.log("database connected");
    }).catch((err)=>{
        console.log("database",  err);
    })
})