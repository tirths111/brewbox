const express = require('express');
const connectionDB = require('./config/db');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser')
const userRoute = require('./routes/user-routes');
const orderRoute = require('./routes/order-routes');
const productRoute = require('./routes/product-routes');
const categoryRoute = require('./routes/category-route');
const authRouter = require('./routes/auth');
 const session = require('express-session');
const statusRoute = require('./routes/status-routes');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const cors = require('cors');   
const hpp = require('hpp');
const rateLimit = require('express-rate-limit')
const xss = require('xss-clean');
dotenv.config({ path: "./config/config.env"});

  
connectionDB();

const app = express();

app.use(express.json());

app.use(mongoSanitize());

app.use(helmet());

app.use(xss());

app.use(hpp());


const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 mins
    max: 100
  });
  app.use(limiter);

  app.use(cors());


// Cookie parser
app.use(cookieParser());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 1000 } // Session cookie expires after 1 hour
  }));

const port = process.env.PORT || 5000;

app.use('/api/v1/products' , productRoute);

app.use('/api/v1/categories' , categoryRoute);

app.use('/api/v1/users' , userRoute);

app.use('/api/v1/orders' , orderRoute);

app.use('/api/v1/status' , statusRoute);

app.use('/api/v1/auth' , authRouter);


app.listen(port, console.log(`Server running on this port`));

