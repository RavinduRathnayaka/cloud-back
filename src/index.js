const express = require('express');
const cors = require('cors'); // Import the cors package
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config();

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS for all routes
app.use(cors({
  origin: 'https://gleaming-maamoul-ef8d61.netlify.app' // or use '*' for all origins in development
}));



app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});
//------------------------------------------ Importing Routes -----------------------------------------------------


const UserRoutes = require('./Routes/user.routes')
app.use('/api/auth',UserRoutes);

const feedbackRoutes = require('./Routes/feedback.routes')
app.use('/api/auth',feedbackRoutes);

const deliveryManagementRoutes = require('./Routes/driver.routes')
app.use('/api/auth',deliveryManagementRoutes);

const supplyManagementRoutes = require('./Routes/supplier.routes')
app.use('/api/auth',supplyManagementRoutes);

const orderManagementRoutes = require('./Routes/order.routes')
app.use('/api/auth',orderManagementRoutes);

const newsfeedManagementRoutes = require('./Routes/newsFeed.routes')
app.use('/api/auth',newsfeedManagementRoutes);

const itemRoutes = require('./Routes/inventory.routes')
app.use('/api/auth',itemRoutes);


// -------------------------------------------------------------------------------------------------------------------------------------------------
// require('./config/passportConfig'); 
// const authRoutes = require('./Routes/auth.routes');
// // Session setup (to store user sessions)
// app.use(
//   session({
//     secret: '3rZr9c98vZeNUgAhZjMz6ZXBGHz9uF7zXxRGhrvLz8Y',
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       secure: false,  // Change to true if you're in production with HTTPS
//     },
//   })
// );


// Initialize Passport and session
// app.use(passport.initialize());
// app.use(passport.session());

// Routes
// app.use('/auth', authRoutes);


//-----------------------------------------End of Routes ----------------------------------------------------------

// Database Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));



app.listen(port, () => {
  console.log(`Server  running on PORT:${port}`);
  console.log('Dry Food Management API Started !');
});
