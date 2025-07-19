import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";

const verifyJwt = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(403).json({ message: "Access token missing" });
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (!decodedToken || !decodedToken._id) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const user = await User.findById(decodedToken._id);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    console.log("✅ Token OK, user:", user.username);

    
    req.user = user
    
    
    //   _id: user._id.toString(),
    //   username: user.username,
    // };

    next();
  } catch (error) {
    console.error("❌ JWT verification error:", error.message);
    return res.status(401).json({ message: "Access denied: " + error.message });
  }
};

export { verifyJwt };
