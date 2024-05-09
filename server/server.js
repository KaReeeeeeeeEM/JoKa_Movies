const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const path = require("path");
const cors = require("cors");
const User = require("./User");
const axios = require("axios");
const bcrypt = require("bcryptjs");
require("dotenv").config();
require("./GoogleAuth2");

const accsid = process.env.TWILIO_ACCOUNT_SID;
const accauth = process.env.TWILIO_AUTH_TOKEN;

const client = require("twilio")(
  "ACdd8792238cba22a1e6b87fa402be048e",
  "fb75b0be890bddb454fa9ebc940e0d16"
);

const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.use(
  session({
    secret: "your_session_secret",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(express.static(path.join(__dirname, "public")));

// Initialize Passport middleware
app.use(passport.initialize());
app.use(passport.session()); // If using sessions

//function to generate a six-digit code

app.get("/", (req, res) => {
  res.redirect('https://joka-movies-frontend.onrender.com/SignInSide'
  );
});

app.get("/api", (req, res) => {
  res.json({
    message: "Hello World from your server!",
    CEO: "Mmbaga, Johnson Nathaniel",
    Vision:
      "Allowing latest updates of the upcoming movies and TV shows as well as trending movies in the backend, of course it wont be pretty like how anyone would expect. Enjoy 😊",
    Links: {
      upcomingMovies:
        "https://api.themoviedb.org/3/movie/popular?api_key=035c0f1a7347b310a5b95929826fc81f&language=en-US&page=1",
      trendingMovies:
        "https://api.themoviedb.org/3/trending/all/day?api_key=035c0f1a7347b310a5b95929826fc81f",
      popularTVShows:
        "https://api.themoviedb.org/3/tv/top_rated?api_key=035c0f1a7347b310a5b95929826fc81f&language=en-US",
      featuredContent:
        "https://api.themoviedb.org/3/movie/upcoming?api_key=035c0f1a7347b310a5b95929826fc81f",
    },
  });
});

app.post("/api/submit-form", async (req, res) => {
  try {
    const { email, phone, password } = req.body.formInfo;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email: email,
      phone: phone,
      password: hashedPassword,
    });
    await newUser.save();
    console.log(`Created a new user ${newUser}`);
    res.status(200).send({
      success: true,
      message: "Data saved successfully",
      redirectTo: "https://joka-movies.onrender.com:3000/Dashboard"                    
  ,
    });
    //res.redirect('http://localhost:3000/Dashboard');
  } catch (err) {
    console.error(err);
    res.status(500).send({ success: false, error: "Failed to save data" });
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  // Validate email and password presence (optional)
  if (!email || !password) {
    return res
      .status(400)
      .send({ message: "Please provide email and password." });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({ message: "Incorrect email or password." });
    }

    // Compare hashed passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ message: "Incorrect email or password." });
    }

    // Login successful, send response (replace with your desired data)
    res.send({ message: "Login successful!", user: { user }, redirectTo:`https://joka-movies.onrender.com:3000/Dashboard/                                        
  
  ${user.displayName}?profile=${user.profilePic}` }); // Consider security implications of sending user data

  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send({ message: "Internal server error." });
  }
});

// Create a new user (example)
app.post("/users", async (req, res) => {
  const newUser = new User(req.body);
  try {
    await newUser.save();
    res.send("User created successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating user");
  }
});

// Generate a random 6-digit code
function generateCode() {
  return Math.floor(100000 + Math.random() * 900000);
}

const generateAndStoreCode = (req, res, next) => {
  const code = generateCode();
  // Store code temporarily (e.g., in a local variable)
  req.verificationCode = code;
  next();
};

// POST endpoint to send the code
app.post("/api/send-code", async (req, res) => {
  const phoneNumber = req.body.phoneNumber;
  const code = generateCode();

  const user = await User.findOne({ phone: phoneNumber });

  if(user){
  client.messages
    .create({
      body: `Your verification code is ${code}`,
      from: "+16562213700",
      to: phoneNumber,
    })
    .then(() => {
      res.status(200).send({
        success: true,
        message: `Code sent successfully to ${phoneNumber}`,
        code: code,
      });
      console.log(`Sent code ${code} successfully to ${phoneNumber}`);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({ success: false, error: "Failed to send code" });
    });
}else{
    res.status(401).json({error:'User not found! Please enter a phone number that is registered.'})
}});

app.post("/api/verify-code/:code", async (req, res) => {
  //const phoneNumber = req.body.phoneNumber;
  const code = req.body.code;
  const receivedCode = req.params.code;
    
  try {
    if(code === receivedCode){
      res.status(200).send({
        success: true,
        code: receivedCode,
      });
    }else{
        res.status(400).send({
            success: false,
            message: "Invalid code"
        });
    }
  } catch (error) {
    console.log("Error sending code");
  }
});

app.post('/change-password', async (req,res) => {
    const { password, phoneNumber} = req.body.formInfo;
    try {
        // Find user by phone number
        const user = await User.findOne({ phone: phoneNumber });
    
        if (!user) {
          return res.status(404).send({ success: false, error: 'User not found' });
        }
    
        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10); // Adjust cost factor as needed
    
        // Update user password
        user.password = hashedPassword;
        await user.save();
    
        // Send success response and redirect (optional)
        res.status(200).send({ success: true, message: 'Password updated successfully' });
        res.redirect(`https://joka-movies.onrender.com:3000/SignInSide`                    
                      
  ); // Uncomment to redirect to SignInSide
      } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, error: 'Failed to update password' });
      }
})

/// Google OAuth route
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Callback route after Google authentication
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect(
      `https://joka-movies.onrender.com:3000/Dashboard/                    
  ${req.user.displayName}?profile=${req.user.profilePic}`
    ); // Redirect to dashboard or home page
  }
);


app.get("/logout", (req, res) => {
  // req.session.destroy(function(err){
  //     if(err){
  //         console.log(err);
  //     }else{
  //         console.log('Session destroyed');
  //     }
  // });
  res.redirect("/");
});

const PORT = process.env.PORT_NO;
app.listen(10000, () => console.log(`Server listening on port ${PORT}`));
