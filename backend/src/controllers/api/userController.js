import db from "../../db.js";

const getUserDetails = async (req, res) => {
  const userId = req.userId;

  db.query(
    "SELECT id, username, email FROM users WHERE id = ?",
    [userId],
    (error, results) => {
      if (error || results.length === 0) {
        return res.status(404).json({ message: "User not Found" });
      }

      const user = results[0];
      return res.status(200).json(user);
    }
  );
};

export { getUserDetails };
