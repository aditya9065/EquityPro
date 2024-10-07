const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const {HoldingsModel} = require('./model/HoldingsModel')
const {OrdersModel} = require('./model/OrdersModel');
const {PositionsModel} = require('./model/PositionsModel');
const { Signup, Login } = require('./Controllers/AuthController');
const { userVerification } = require('./Middlewares/AuthMiddleware');

const PORT = 8080;
const URL = process.env.MONGO_URL;

app.use(cors(
  {
    origin: ["http://localhost:5173" , "http://localhost:5174", "https://equity-pro-dashboard-kn1difrvo.vercel.app", "https://equity-rkid5nobj-aditya-kumar-singhs-projects-c2781cc1.vercel.app", "https://equity-pro.vercel.app", "https://equity-pro-lan-git-8c51b4-aditya-kumar-singhs-projects-c2781cc1.vercel.app", "https://equity-pro-landingpage-r281377el.vercel.app", "https://equity-pro-dashboard.vercel.app", "https://equity-pro-das-git-5dcb03-aditya-kumar-singhs-projects-c2781cc1.vercel.app", "https://equity-pro-dashboard-aditya-kumar-singhs-projects-c2781cc1.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }
));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());

app.get("/allHoldings", async(req, res) => {
  let allHoldings = await HoldingsModel.find({});
  res.json(allHoldings);
});

app.get("/allPositions", async(req, res) => {
  let allPositions = await PositionsModel.find({});
  res.json(allPositions);
});

app.post("/newOrder", async(req, res)=>{
  let newOrder = new OrdersModel({
    name: req.body.name,
    qty: req.body.qty,
    price: req.body.price,
    mode: req.body.mode
  });
  console.log("saved")
  newOrder.save();
  res.send("Order Saved");
});

app.get('/allOrders', async(req, res) => {
  let allOrders = await OrdersModel.find({});
  res.json(allOrders);
});

app.post('/signup', Signup);
app.post('/login', Login);
app.post('/',userVerification)

// app.get("/addHoldings", async(req, res)=>{
//     let tempHoldings = [
//         {
//           name: "BHARTIARTL",
//           qty: 2,
//           avg: 538.05,
//           price: 541.15,
//           net: "+0.58%",
//           day: "+2.99%",
//         },
//         {
//           name: "HDFCBANK",
//           qty: 2,
//           avg: 1383.4,
//           price: 1522.35,
//           net: "+10.04%",
//           day: "+0.11%",
//         },
//         {
//           name: "HINDUNILVR",
//           qty: 1,
//           avg: 2335.85,
//           price: 2417.4,
//           net: "+3.49%",
//           day: "+0.21%",
//         },
//         {
//           name: "INFY",
//           qty: 1,
//           avg: 1350.5,
//           price: 1555.45,
//           net: "+15.18%",
//           day: "-1.60%",
//           isLoss: true,
//         },
//         {
//           name: "ITC",
//           qty: 5,
//           avg: 202.0,
//           price: 207.9,
//           net: "+2.92%",
//           day: "+0.80%",
//         },
//         {
//           name: "KPITTECH",
//           qty: 5,
//           avg: 250.3,
//           price: 266.45,
//           net: "+6.45%",
//           day: "+3.54%",
//         },
//         {
//           name: "M&M",
//           qty: 2,
//           avg: 809.9,
//           price: 779.8,
//           net: "-3.72%",
//           day: "-0.01%",
//           isLoss: true,
//         },
//         {
//           name: "RELIANCE",
//           qty: 1,
//           avg: 2193.7,
//           price: 2112.4,
//           net: "-3.71%",
//           day: "+1.44%",
//         },
//         {
//           name: "SBIN",
//           qty: 4,
//           avg: 324.35,
//           price: 430.2,
//           net: "+32.63%",
//           day: "-0.34%",
//           isLoss: true,
//         },
//         {
//           name: "SGBMAY29",
//           qty: 2,
//           avg: 4727.0,
//           price: 4719.0,
//           net: "-0.17%",
//           day: "+0.15%",
//         },
//         {
//           name: "TATAPOWER",
//           qty: 5,
//           avg: 104.2,
//           price: 124.15,
//           net: "+19.15%",
//           day: "-0.24%",
//           isLoss: true,
//         },
//         {
//           name: "TCS",
//           qty: 1,
//           avg: 3041.7,
//           price: 3194.8,
//           net: "+5.03%",
//           day: "-0.25%",
//           isLoss: true,
//         },
//         {
//           name: "WIPRO",
//           qty: 4,
//           avg: 489.3,
//           price: 577.75,
//           net: "+18.08%",
//           day: "+0.32%",
//         },
//     ];
//     await HoldingsModel.deleteMany({});
//     await HoldingsModel.insertMany(tempHoldings);
//     console.log("done");
//     res.send("done")
// });

// app.get("/addPositions", async(req, res)=>{
//     let tempPostions = [
//         {
//           product: "CNC",
//           name: "EVEREADY",
//           qty: 2,
//           avg: 316.27,
//           price: 312.35,
//           net: "+0.58%",
//           day: "-1.24%",
//           isLoss: true,
//         },
//         {
//           product: "CNC",
//           name: "JUBLFOOD",
//           qty: 1,
//           avg: 3124.75,
//           price: 3082.65,
//           net: "+10.04%",
//           day: "-1.35%",
//           isLoss: true,
//         },
//       ];
//     await PositionsModel.deleteMany({});
//     await PositionsModel.insertMany(tempPostions);
//     console.log("done");
//     res.send("done");
// });

app.listen(PORT, async () => {
    console.log("listening...",PORT)
    await mongoose.connect(URL)
    .then(()=>{
        console.log("database connected");
    }).catch((err)=>{
        console.log("database",  err);
    })
})