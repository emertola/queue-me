import passport from 'passport';
import { Strategy } from 'passport-local';
import { mockUsers } from '../utils';

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  try {
    const findUser = mockUsers.find((user) => user.id === id);
    if (!findUser) {
      throw new Error('User Not Found!');
    }
    done(null, findUser);
  } catch (error) {
    done(error, null);
  }
});

passport.use(
  new Strategy((username, password, done) => {
    // code here will be responsible for validating username & password
    // ex. validate if the user exists from the database

    try {
      const findUser = mockUsers.find((user) => user.username === username);
      const passwordMatch = findUser?.password === password;
      if (!(findUser || passwordMatch)) {
        throw new Error('Invalid Credentials!');
      }
      done(null, findUser);
    } catch (error) {
      done(error, false);
    }
  })
);

export default passport;
