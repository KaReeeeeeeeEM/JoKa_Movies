const mongoose = require("mongoose");
require('dotenv').config();
// Connect to your MongoDB database (replace with your connection URI)
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('Error connecting to MongoDB:', err));
