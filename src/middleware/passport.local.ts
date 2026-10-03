import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { handleLogin } from "services/auth/auth.service";

const configPassportLocal = () => {
  passport.use(
    new LocalStrategy({ passReqToCallback: true }, function verify(
      req,
      username,
      password,
      callback,
    ) {
      const { session } = req as any;
      if (session?.messages?.length) {
        session.messages = [];
      }
      return handleLogin(username, password, callback);
    }),
  );
  passport.serializeUser(function (user: any, cb) {
    process.nextTick(function () {
      return cb(null, {
        id: user.id,
        username: user.username,
        picture: user.picture,
      });
    });
  });

  passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
      return cb(null, user);
    });
  });
};

export default configPassportLocal;
