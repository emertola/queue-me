import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import routes from './routes';
import './strategies/local-strategy';

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cookieParser());
app.use(
  session({ secret: 'session123', resave: false, saveUninitialized: false })
);
app.use(passport.initialize());
app.use(passport.session());
app.use('/api/v1', routes);

app.listen(PORT, () => console.log(`Running express server on PORT ${PORT}`));
