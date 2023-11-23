import cookieParser from 'cookie-parser';
import cors from 'cors';
import { config } from 'dotenv';
import express from 'express';
import session from 'express-session';
import helmet from 'helmet';
import { connect } from 'mongoose';
import morgan from 'morgan';
import passport from 'passport';
import passportConfig from './passport-config.js';

import authRoute from './routes/authRoute.js';
import categoryRoute from './routes/categoryRoute.js';
import imageRoute from './routes/imageRoute.js';
import indexRoute from './routes/indexRoute.js';
import orderRoute from './routes/orderRoute.js';
import productRoute from './routes/productRoute.js';
import questionRoute from './routes/questionRoute.js';
import reviewRoute from './routes/reviewRoute.js';
import userRoute from './routes/userRoute.js';

config();

connect(
  process.env.DB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (error) => {
    if (error) throw error;
    console.log('Database connection established.');
  }
);

const app = express();

app.use(morgan('dev'));

app.use(helmet());

app.use(express.json());

app.use(
  cors({
    origin: [
      'https://localhost:3000',
      'http://localhost:3000',
      'https://emicro-site.netlify.app',
      'https://emicro-site.azurewebsites.net',
    ],
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    proxy: true,
    cookie: { sameSite: 'none', secure: true, httpOnly: true },
  })
);
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
passportConfig(passport);

app
  .use('/', indexRoute)
  .use('/auth', authRoute)
  .use('/user', userRoute)
  .use('/product', productRoute)
  .use('/category', categoryRoute)
  .use('/order', orderRoute)
  .use('/review', reviewRoute)
  .use('/question', questionRoute)
  .use('/image', imageRoute);

app.listen(process.env.PORT || 8080, () => {
  console.log('Server listening on port: ' + (process.env.PORT || '8080'));
});
