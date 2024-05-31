import db from "../../db.js";

const postSuppliers = async (req, res) => {
  const userId = req.userId;
  const { name, address, email, phone } = req.body;

  db.query(
    "INSERT INTO suppliers (user_id, name, address, email, phone) VALUES (?, ?, ?, ?, ?)",
    [userId, name, address, email, phone],
    (error, result) => {
      if (error) {
        return res.status(404).json(error);
      }

      return res
        .status(200)
        .json({ message: "Supplier is posted succesfully!" });
    }
  );
};

const updateSuppliers = async (req, res) => {
  const userId = req.userId;
  const { supplier_id, name, address, email, phone } = req.body;

  const productUpdateQuery =
    "UPDATE suppliers SET name = ?, address = ?, email = ?, phone = ? WHERE user_id = ? AND supplier_id = ?";

  db.query(
    productUpdateQuery,
    [name, address, email, phone, userId, supplier_id],
    (error, results) => {
      if (error) {
        return res.status(400).json(error);
      }

      if (results.affectedRows === 0) {
        return res
          .status(404)
          .json({ message: "Supplier not found or user not authorized" });
      }

      return res
        .status(200)
        .json({ message: "Supplier has been successfully updated" });
    }
  );
};

const getSuppliers = async (req, res) => {
  const userId = req.userId;

  db.query(
    "SELECT * from suppliers WHERE user_id = ?",
    [userId],
    (error, results) => {
      if (error) {
        return res
          .status(404)
          .json({ message: "There are no supplier to this user." });
      }

      const supplier = results;
      return res.status(200).json(supplier);
    }
  );
};

export { postSuppliers, getSuppliers, updateSuppliers };
