import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { getUserWithRoleById, handleLogin } from "services/auth/auth.service";

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
  passport.serializeUser(function (user: any, callback) {
    return callback(null, {
      id: user.id,
      username: user.username,
    });
  });

  passport.deserializeUser(async function (user: any, callback) {
    const { id, username } = user;
    //query to db
    const userInDB = await getUserWithRoleById(id);
    return callback(null, { ...userInDB });
  });
};

export default configPassportLocal;
