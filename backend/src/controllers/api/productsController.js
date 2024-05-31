import db from "../../db.js";

const postProduct = async (req, res) => {
  const userId = req.userId;
  const { name, purchase_price, sale_price, saleable } = req.body;

  db.query(
    "INSERT INTO products (user_id, name, purchase_price, sale_price, saleable) VALUES (?, ?, ?, ?, ?)",
    [userId, name, purchase_price, sale_price, saleable],
    (error, results) => {
      if (error) {
        return res.status(400).json(error);
      }

      return res
        .status(200)
        .json({ message: "Product has been successfully posted" });
    }
  );
};

const updateProducts = async (req, res) => {
  const userId = req.userId;
  const { product_id, name, purchase_price, sale_price, saleable } = req.body;

  const productUpdateQuery =
    "UPDATE products SET name = ?, purchase_price = ?, sale_price = ?, saleable = ? WHERE user_id = ? AND product_id = ?";

  db.query(
    productUpdateQuery,
    [name, purchase_price, sale_price, saleable, userId, product_id],
    (error, results) => {
      if (error) {
        return res.status(400).json(error);
      }

      if (results.affectedRows === 0) {
        return res
          .status(404)
          .json({ message: "Product not found or user not authorized" });
      }

      return res
        .status(200)
        .json({ message: "Product has been successfully updated" });
    }
  );
};

const getProducts = async (req, res) => {
  const userId = req.userId;

  db.query(
    "SELECT * FROM products WHERE user_id = ?",
    [userId],
    (error, results) => {
      if (error || results.length === 0) {
        return res
          .status(404)
          .json({ message: "There are no products to this user" });
      }

      const products = results;
      return res.status(200).json(products);
    }
  );
};

export { getProducts, postProduct, updateProducts };
