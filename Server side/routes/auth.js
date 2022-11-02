const router = require("express").Router();
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");
const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const TwitterStrategy = require("passport-twitter").Strategy;

passport.use(User.createStrategy());

passport.serializeUser(function (user, done) {
  console.log("Serializing user..");
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

//  Function for resolving same username conflict

let generateUniqueAccountName = async (proposedName) => {
  const func = await User.findOne(
    { username: proposedName },
    (err, account) => {
      if (!err) {
        if (account) {
          proposedName += Math.floor(Math.random() * 100 + 1);
          return generateUniqueAccountName(proposedName);
        }
        return;
      } else {
        console.log(err);
      }
    }
  );
  return proposedName;
};

const successLoginUrl = "http://localhost:3000/";
const failureLoginUrl = "http://localhost:3000/login/failure";

//   Google Login strategy

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GCLIENT_ID,
      clientSecret: process.env.GCLIENT_SECRET,
      // callbackURL: "https://hi-con.herokuapp.com/api/auth/google/HI-CON",
      callbackURL: "http://localhost:8080/api/auth/google/HI-CON",
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      let newname = await generateUniqueAccountName(profile.displayName);
      User.findOne(
        {
          googleId: profile.id,
        },
        function (err, user) {
          if (err) {
            return done(err);
          }
          if (!user) {
            user = new User({
              email: profile.emails[0].value,
              username: newname,
              googleId: profile.id,
              profilePicture: profile.photos[0].value,
            });
            user.save(function (err) {
              if (err) console.log(err);
              return done(err, user);
            });
          } else {
            return done(err, user);
          }
        }
      );
    }
  )
);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/HI-CON",
  passport.authenticate("google", {
    failureRedirect: failureLoginUrl,
    session: true,
  }),
  (req, res) => {
    // res.json(req.user);
    res.redirect(successLoginUrl);
  }
);

// Facebook Login strategy

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      // callbackURL: "https://hi-con.herokuapp.com/api/auth/facebook/HI-CON",
      callbackURL: "http://localhost:8080/api/auth/facebook/HI-CON",
      profileFields: [
        "id",
        "displayName",
        "email",
        "picture.type(large)",
        "birthday",
        "friends",
        "first_name",
        "last_name",
        "middle_name",
        "gender",
        "link",
      ],
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      console.log(accessToken);
      let newname = await generateUniqueAccountName(profile.displayName);
      User.findOne(
        {
          facebookId: profile.id,
        },
        function (err, user) {
          if (err) {
            return done(err);
          }
          if (!user) {
            user = new User({
              email: profile.emails[0].value,
              username: newname,
              facebookId: profile.id,
              profilePicture: profile.photos
                ? profile.photos[0].value
                : "https://c-engage.com/wp-content/uploads/2019/09/member-placeholder-500px-1024x1024.jpg",
            });
            user.save(function (err) {
              if (err) console.log(err);
              return done(err, user);
            });
          } else {
            return done(err, user);
          }
        }
      );
    }
  )
);

router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["email", "public_profile"] })
);

router.get(
  "/facebook/HI-CON",
  passport.authenticate("facebook", {
    failureRedirect: failureLoginUrl,
    session: true,
  }),
  (req, res) => {
    // res.json(req.user);
    res.redirect(successLoginUrl);
  }
);

// Twitter Login strategy

passport.use(
  new TwitterStrategy(
    {
      consumerKey: process.env.TWITTER_CONSUMER_KEY,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
      callbackURL: "http://127.0.0.1:8080/api/auth/twitter/HI-CON",
      userProfileURL:
        "https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true",
      includeEmail: true,
    },
    async (token, tokenSecret, profile, done) => {
      let newname = await generateUniqueAccountName(profile.displayName);
      User.findOne(
        {
          twitterId: profile.id,
        },
        function (err, user) {
          if (err) {
            return done(err);
          }
          if (!user) {
            user = new User({
              email: "profile.emails[0].value",
              username: newname,
              twitterId: profile.id,
              profilePicture: profile.photos
                ? profile.photos[0].value
                : "https://c-engage.com/wp-content/uploads/2019/09/member-placeholder-500px-1024x1024.jpg",
            });
            user.save(function (err) {
              if (err) console.log(err);
              return done(err, user);
            });
          } else {
            return done(err, user);
          }
        }
      );
      console.log(profile);
    }
  )
);

router.get("/twitter", passport.authenticate("twitter"));

router.get(
  "/twitter/HI-CON",
  passport.authenticate("twitter", {
    failureRedirect: failureLoginUrl,
    session: true,
  }),
  (req, res) => {
    // res.json(req.user);
    res.redirect(successLoginUrl);
  }
);

//Local strategy

//REGISTER
router.post("/register", async (req, res) => {
  Users = new User({ email: req.body.email, username: req.body.username });
  // console.log(req.body);
  User.register(Users, req.body.password, (err, user) => {
    if (err) {
      return res.status(500).json({ success: false, message: err });
    } else {
      passport.authenticate("local")(req, res, () => {
        console.log(user);
        return res.status(200).json(user);
      });
    }
  });
});

//LOGIN

router.post("/login", function (req, res, next) {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(404).json({ success: false, message: info.message });
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      console.log(user);
      return res.status(200).json(user);
    });
  })(req, res, next);
});

//Logout

router.get("/logout", function (req, res) {
  req.logOut();
  res.clearCookie("connect.sid");
  req.session.destroy(function (err) {
    res
      .status(200)
      .json({ success: true, message: "User logged out successfully" });
  });
});

//Check if user is authenticated

const checkUserStatus = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.status(476).send("You must login first");
  }
};

router.get("/user", checkUserStatus, (req, res) => {
  res.json(req.user);
});

module.exports = router;
