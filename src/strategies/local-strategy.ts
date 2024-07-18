import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { comparePassword, hashPassword } from '../utils';
import { AuthLocalUser } from '../schemas';

passport.use(
  new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, next) => {
      try {
        const user = await AuthLocalUser.findOne({ email });

        const hashedPassword = hashPassword(password);
        const passwordMatch = comparePassword(password, hashedPassword);

        if (!(user || passwordMatch)) {
          return next(null, false, { message: 'Invalid credentials!' });
        }

        return next(null, user?.toObject());
      } catch (error) {
        return next(error);
      }
    }
  )
);

export default passport;
