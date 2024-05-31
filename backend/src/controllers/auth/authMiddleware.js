import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  const authToken = token && token.split(" ")[1];

  if (!authToken) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(authToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(500)
        .json({
          auth: false,
          message: "Failed to authenticate token",
          error: err,
        });
    }

    req.userId = decoded.id;

    next();
  });
};

export { verifyToken };
