const mongoose = require("mongoose");
const passportlocalmongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 20,
      unique: true,
      sparse: true,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      sparse: true,
    },
    googleId: {
      type: String,
    },
    facebookId: {
      type: String,
    },
    twitterId: {
      type: String,
    },
    profilePicture: {
      type: String,
      default:
        "https://c-engage.com/wp-content/uploads/2019/09/member-placeholder-500px-1024x1024.jpg",
    },
    coverPicture: {
      type: String,
      default: "",
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    desc: {
      type: String,
      max: 100,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

UserSchema.plugin(passportlocalmongoose);

module.exports = mongoose.model("User", UserSchema);
