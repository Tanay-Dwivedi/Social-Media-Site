require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const session = require("express-session");
const passport = require("passport");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postsRoute = require("./routes/posts");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
// const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cookieParser());
app.set("trust proxy", 1);

app.use(
  session({
    secret: "sinuocbsdj",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      sameSite: "Lax",
    },
  })
);
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => {
    console.log("Connected to MongoDB");
  }
);

app.use(express.static("public"));
app.use(express.json());
app.use(helmet());
app.use(morgan("combined"));
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postsRoute);

// app.use(cors({
// origin: '*',
// credentials: true }));

app.use(function (req, res, next) {
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type, Accept,Authorization,Origin"
  );
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.listen(process.env.PORT || 8080, () => {
  console.log("server running at " + PORT);
});
