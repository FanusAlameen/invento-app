import db from "../../db.js";

const postPurchase = async (req, res) => {
  const userId = req.userId;
  const purchaseData = req.body;

  purchaseData.forEach((purchase) => {
    purchase.user_id = userId;
  });

  const postPurchaseQuery =
    "INSERT INTO purchases (user_id, supplier_id, product_id, product_name, purchase_price, quantity, item_total, discount, total) VALUES ?";
  const values = purchaseData.map((purchase) => [
    purchase.user_id,
    purchase.supplier_id,
    purchase.product_id,
    purchase.product_name,
    purchase.purchase_price,
    purchase.quantity,
    purchase.item_total,
    purchase.discount,
    purchase.total,
  ]);

  db.query(postPurchaseQuery, [values], (error, result) => {
    if (error) {
      return res.status(404).json({ error: "Failed to send purchase data" });
    }

    return res
      .status(201)
      .json({ message: "Purchase data inserted successfully!" });
  });
};

const getPurchase = async (req, res) => {
  const userId = req.userId;

  const purchaseDetailsQuery = `
    SELECT 
    p.purchase_id, 
    s.name AS supplier_name,
    pr.name AS product_name,
    p.purchase_price AS order_amount,
    p.quantity,
    p.item_total,
    p.discount,
    p.total,
    DATE_FORMAT(p.date_time, '%d-%m-%Y') AS date
    FROM 
       purchases p
    JOIN 
       suppliers s ON p.supplier_id = s.supplier_id
    JOIN
       products pr ON p.product_id = pr.product_id
    WHERE
       p.user_id = ?
    GROUP BY
       p.purchase_id,
       p.supplier_id,
       s.name,
       p.purchase_price,
       p.quantity,
       p.item_total,
       p.discount,
       p.total,
       p.date_time
    ORDER BY
       p.date_time ASC`;

  db.query(purchaseDetailsQuery, [userId], (error, results) => {
    if (error) {
      return res.status(404).json({ error: "No purchase data found!" });
    }

    const purchaseData = results;
    return res.status(200).json(purchaseData);
  });
};

export { postPurchase, getPurchase };
