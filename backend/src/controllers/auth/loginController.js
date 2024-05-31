import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../../db.js";
import dotenv from "dotenv";

dotenv.config();

const login = async (req, res) => {
  const { username, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    async (error, results) => {
      if (error || results.length === 0) {
        return res
          .status(401)
          .json({ message: "Invalid username or password" });
      }

      const user = results[0];

      //check if password is correct
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res
          .status(401)
          .json({ message: "Invalid username or password" });
      }

      //Generate JWT Token
      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res
        .status(200)
        .json({
          auth: true,
          token: token,
          message: "Successfully authenticated the token",
        });
    }
  );
};

export { login };
