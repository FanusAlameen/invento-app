import db from "../../db.js";

const postSale = async (req, res) => {
  const userId = req.userId;
  const saleData = req.body;

  saleData.forEach((sale) => {
    sale.user_id = userId;
  });

  const postSaleQuery =
    "INSERT INTO sales (user_id, client_id, product_id, product_name, sale_price, quantity, item_total, discount, total) VALUES ?";
  const values = saleData.map((sale) => [
    sale.user_id,
    sale.client_id,
    sale.product_id,
    sale.product_name,
    sale.sale_price,
    sale.quantity,
    sale.item_total,
    sale.discount,
    sale.total,
  ]);

  db.query(postSaleQuery, [values], (error, result) => {
    if (error) {
      return res.status(404).json({ error: "Failed to send sale data" });
    }

    return res
      .status(200)
      .json({ message: "Sale data has been inserted successfully!" });
  });
};

const getSaleData = async (req, res) => {
  const userId = req.userId;

  const saleDataQuery = `
    SELECT 
    s.sale_id, 
    c.name AS client_name, 
    p.name AS product_name, 
    s.sale_price AS order_amount, 
    s.quantity, 
    s.item_total, 
    s.discount, 
    s.total, 
    DATE_FORMAT(s.date_time, '%d-%m-%Y') AS date 
    FROM 
       sales s 
    JOIN 
       clients c ON s.client_id = c.client_id 
    JOIN 
       products p ON s.product_id = p.product_id 
    WHERE 
        s.user_id = ? 
    GROUP BY 
        s.sale_id, 
        s.client_id, 
        c.name, 
        s.sale_price, 
        s.quantity, 
        s.item_total, 
        s.discount, 
        s.total, 
        s.date_time 
    ORDER BY 
        s.date_time ASC`;

  db.query(saleDataQuery, [userId], (error, result) => {
    if (error) {
      return res.status(404).json(error);
    }

    const saleData = result;
    return res.status(200).json(saleData);
  });
};

export { postSale, getSaleData };
