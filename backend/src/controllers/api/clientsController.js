import db from "../../db.js";

const postClients = async (req, res) => {
  const user_id = req.userId;
  const { name, address, email, phone } = req.body;

  db.query(
    "INSERT INTO clients (user_id, name, address, email, phone) VALUES (?, ?, ?, ?, ?)",
    [user_id, name, address, email, phone],
    (error, results) => {
      if (error) {
        console.log(error);
        return res.status(404).json(error);
      }

      return res
        .status(200)
        .json({ message: "Client was posted successfully" });
    }
  );
};

const updateClients = async (req, res) => {
  const userId = req.userId;
  const { client_id, name, address, email, phone } = req.body;

  const clientUpdateQuery =
    "UPDATE clients SET name = ?, address = ?, email = ?, phone = ? WHERE user_id = ? AND client_id = ?";

  db.query(
    clientUpdateQuery,
    [name, address, email, phone, userId, client_id],
    (error, results) => {
      if (error) {
        return res.status(400).json(error);
      }

      if (results.affectedRows === 0) {
        return res
          .status(404)
          .json({ message: "Client not found or user not authorized" });
      }

      return res
        .status(200)
        .json({ message: "Client has been successfully updated" });
    }
  );
};

const getClients = async (req, res) => {
  const userId = req.userId;

  db.query(
    "SELECT * FROM clients WHERE user_id = ?",
    [userId],
    (error, results) => {
      if (error) {
        return res
          .status(404)
          .json({ message: "There are clients to this user" });
      }

      const clients = results;
      return res.status(200).json(clients);
    }
  );
};

export { getClients, postClients, updateClients };
