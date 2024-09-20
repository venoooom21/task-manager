const cookieParser = require("cookie-parser");
// Other requires...
const cors =require("cors");
const dotenv  =require("dotenv").config();
const express =require("express");
const mongoose = require("mongoose");
const morgan =require("morgan");
dotenv.config
const app = express();
app.use(cors());
app.use(cookieParser)
app.use(express.json());
app.use(morgan("dev"));
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const FRONTEND_URL = process.env.FRONTEND_URL;

console.log('MongoDB URI:', MONGODB_URI);

// MongoDB connection
mongoose.set("strictQuery", false);
mongoose.connect("mongodb://localhost:27017/project")
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB', err));

