import express from 'express';
import passport from 'passport';
import routes from './routes';
import dotenv from 'dotenv';
import cors from 'cors';
import './strategies/local-strategy';
import connectDB from './database/connect';

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 3001;

app.use(
  cors({
    origin: '*',
  })
);
app.use(express.json());
app.use(passport.initialize());

app.use('/api/v1', routes);

app.listen(PORT, () => {
  // initiate db connection
  connectDB();
  console.log(`Running express server on PORT ${PORT}`);
});
