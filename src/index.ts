import express from 'express';
import userRouter from './routes/user.route';

const app = express();
const PORT = 3000;

app.use('/api/users', userRouter);

app.listen(PORT, () => console.log(`Listening to Port: ${PORT}`));
