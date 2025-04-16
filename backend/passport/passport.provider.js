import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import "dotenv/config";
import { User } from "../models/user.model.js";
import utils from "../utils.js";

export const GoogleProvider = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.PASSPORT_CLIENT_ID,
        clientSecret: process.env.PASSPORT_CLIENT_SECRET,
        callbackURL: process.env.PASSPORT_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        const data = profile._json;
        let newUser = null;
        let cloud = null;
        try {
          const user = await User.findOne({ googleId: data.sub });
          if (!user) {
            cloud = await utils.UploadImage(data.picture, "users");
            newUser = await User.create({
              name: data.name,
              avatar: { public_id: cloud.public_id, url: cloud.secure_url },
              email: data.email,
              googleId: data.sub,
            });
            return done(null, newUser);
          } else {
            return done(null, user);
          }
        } catch (error) {
          if (cloud) await utils.DeleteImage(cloud.public_id, "users");
          if (newUser) await User.deleteOne({ _id: newUser._id });
          console.log(error);
          return done(error, null);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      console.log(error);
      done(error, null);
    }
  });
};

export default { GoogleProvider };
