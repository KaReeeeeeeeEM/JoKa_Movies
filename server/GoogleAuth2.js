const mongoose = require('mongoose');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const User = require('./User'); // Assuming your User model file is named User.js
require('dotenv').config();

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'https://joka-movies.onrender.com/auth/google/callback'                    
                      
                      
                      
  , // Replace with your callback URL
},
async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.emails[0].value;
    // Check if user exists in database
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      // Create new user if not exists
      const newUser = new User({
        email: profile.emails[0].value,
        googleId: profile.id,
        profilePic: profile.photos[0].value || '', // Handle potential absence of profile picture
        displayName: profile.displayName
      });

      await newUser.save();
      return done(null, newUser);
    } else {
      // Update user with Google ID, profile picture, and display name
      existingUser.googleId = profile.id;
      existingUser.profilePic = profile.photos[0].value || ''; // Handle potential absence of profile picture
      existingUser.displayName = profile.displayName;

      await existingUser.save();
      return done(null, existingUser);
    }
  } catch (error) {
    console.error('Error finding or creating user:', error);
    return done(error, null); // Pass error to Passport
  }
}));

// Serialize and deserialize user data for session management
passport.serializeUser((user, done) => {
  done(null, user.id); // Store user ID in session (adapt based on your data)
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    console.error('Error finding user:', error);
    done(error, null);
  }
});
