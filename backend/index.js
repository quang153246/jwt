const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL,{
  useNewURLParser: true,
  useUnifiedTopology: true,
},6000000).then(() => console.log("Connect MONGODB")).catch(err => console.log(err));

app.use(cors());
app.use(cookieParser());
app.use(express.json());

//ROUTES
app.use('/v1/auth', authRoute);
app.use('/v1/user', userRoute);

app.listen(8000, () => {
  console.log("Server is running");
});
