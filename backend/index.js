import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import JsonWebToken from "jsonwebtoken";
let secretKey = "secretKey";
const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

mongoose.connect(
  "mongodb+srv://faizan:41526374aa@cluster0.y3f1mbd.mongodb.net/fiverr-Clone",
  (err) => {
    if (err) {
      console.error("database could not connect");
    } else {
      console.log("DB connected");
    }
  }
);

//user schema
const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
  },
  {
    timestamps: true,
  }
);
const User = new mongoose.model("User", userSchema);

//gig schema
const gigSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    category: String,
    skills: Array,
    image: String,
    avgRating: Number,
    price: Number,
    numberOfReviews: Number,
    userId: String,
  },
  {
    timestamps: true,
  }
);
const Gig = new mongoose.model("Gig", gigSchema);

app.get("/gigs", async (req, res) => {
  let gig = await Gig.find({});
  res.status(200).send({ gig });
});

app.put("/gigs", async (req, res) => {
  console.log(req.query._id);
  let putt = await Gig.findByIdAndUpdate(req.query._id, { ...req.body });
  res.status(200).send({ putt });
});

app.get("/myGigs", verifyToken, async (req, res) => {
  JsonWebToken.verify(req.token, secretKey, async (err, authData) => {
    if (err) {
      res.json({ result: "Invalid Token" });
    } else {
      const gigs = await Gig.find({ userId: authData.user._id });
      res.status(200).send({ gigs });
    }
  });
});

app.post("/gigs", verifyToken, async (req, res) => {
  JsonWebToken.verify(req.token, secretKey, async (err, authData) => {
    if (err) {
      res.json({ result: "Invalid Token" });
    } else {
      req.body.userId = authData.user._id;
      let gigs = Gig(req.body);
      await gigs.save();
      res.status(200).send({ gigs });
    }
  });
});

app.delete("/gigs", async (req, res) => {
  let del = await Gig.findByIdAndRemove(req.query.id);
  res.status(200).send({ message: "success" });
});

// Routes

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    if (password === user.password) {
      JsonWebToken.sign(
        { user },
        secretKey,
        { expiresIn: "3000s" },
        (err, token) => {
          res.status(200).json({
            token,
          });
        }
      );
    } else {
      res.status(401).json({
        message: "Password is incorrect",
      });
    }
  } else {
    res.status(401).json({
      message: "User doesn't exist",
    });
  }
});

app.get("/profile", verifyToken, (req, res) => {
  console.log(" line 57");
  console.log("req.token.secretKey : ", req.token);
  JsonWebToken.verify(req.token, secretKey, (err, authData) => {
    console.log(" line 59 : ", err);
    if (err) {
      res.json({ result: "Invalid Token" });
    } else {
      res.json({
        message: "Profile Accessed",
        authData,
      });
    }
  });
});

app.post("/testVerifiedApi", verifyToken, (req, res) => {
  console.log(" line 57");
  console.log("req.token.secretKey : ", req.token);
  JsonWebToken.verify(req.token, secretKey, (err, authData) => {
    console.log(" line 59 : ", err);
    if (err) {
      res.json({ result: "Invalid Token" });
    } else {
      res.json({
        message: "verified data accessed",
      });
    }
  });
});

function verifyToken(req, res, next) {
  let bearerHeader = req.headers["authorization"];
  // console.log(req.headers);
  // console.log("bearerHeader : ", bearerHeader);

  if (bearerHeader) {
    if (typeof bearerHeader !== undefined) {
      let bearer = bearerHeader.split(" ");
      let token = bearer[1];
      console.log("token : ", token);
      req.token = token;
      next();
    } else {
      res.send({
        result: "Token is not valid",
      });
    }
  } else {
    res.status(401).send({
      message: "please provide JWT in header",
    });
  }
}
app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      res.send({ message: "User already registerd" });
    } else {
      const user = new User({
        name,
        email,
        password,
      });
      JsonWebToken.sign(
        { user },
        secretKey,
        { expiresIn: "3000s" },
        (err, token) => {
          if (err) {
            res.status(400).send({ message: "please try again" });
          } else {
            res.json({
              token,
            });
          }
        }
      );
      user.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res.send({ message: "Successfully Registered, Please login now." });
        }
      });
    }
  });
});

app.listen(9002, () => {
  console.log("BE started at port 9002");
});
