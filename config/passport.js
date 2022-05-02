// Passport configuration
const LocalStrategy = require("passport-local").Strategy;
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const bcrypt = require("bcrypt");
const UserService = require("../services/user.service");

function passportConfig(passport) {
  passport.use(
    "signup",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          const user = await UserModel.create({ email, password });

          return done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          const user = await UserService.getUserByEmail(email);

          if (!user) {
            return done(null, false, { message: "User not found" });
          }

          const validate = await user.isValidPassword(password);

          if (!validate) {
            return done(null, false, { message: "Wrong Password" });
          }

          return done(null, user, { message: "Logged in Successfully" });
        } catch (error) {
          return done(error);
        }
      }
    )
  );
  passport.use(
    new JWTstrategy(
      {
        secretOrKey: "TOP_SECRET",
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
        // jwtFromRequest: ExtractJWT.fromAuthHeader("")
        // jwtFromRequest: ExtractJWT.fromUrlQueryParameter("secret_token"),
      },
      async (jwtPayload, done) => {
        return UserService.getUser(jwtPayload.sub)
        .then(user => 
        {
          console.log("JWT returned", user)
          return done(null, user);
        }
      ).catch(err => 
      {
        return done(err);
      });
      }
    )
  );
  passport.serializeUser(function (user, cb) {
    cb(null, user);
  });

  passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
  });

}

module.exports = passportConfig;
