import db from '../../db.js';

const getPurchases = async (req, res) => {
    const userId = req.userId;

    const getTotalPurchase = `SELECT COUNT(purchase_id) as total_purchase FROM purchases WHERE user_id = ?`;

    db.query(getTotalPurchase, [userId], (error, results) => {
        if(error || results.length === 0) {
            return res.status(404).json(error);
        }

        return res.status(200).json(results);
    });
};

const getSales = async (req, res) => {
    const userId = req.userId;

    const getTotalSale = `SELECT COUNT(sale_id) as total_sales FROM sales WHERE user_id = ?`;

    db.query(getTotalSale, [userId], (error, results) => {
        if(error || results.length === 0) {
            return res.status(404).json(error);
        }

        return res.status(200).json(results);
    });
};

const getPurchaseOrders = async (req, res) => {
    const userId = req.userId;

    const getPurchaseOrder = `SELECT COUNT(purchase_order) as total_purchase_orders FROM purchase_orders WHERE user_id = ?`;

    db.query(getPurchaseOrder, [userId], (error, results) => {
        if(error || results.length === 0) {
            return res.status(404).json(error);
        }

        return res.status(200).json(results);
    });
};

const getSaleOrders = async (req, res) => {
    const userId = req.userId;

    const getSaleOrder = `SELECT COUNT(sale_order) as total_sale_order FROM sale_orders WHERE user_id = ?`;

    db.query(getSaleOrder, [userId], (error, results) => {
        if(error || results.length === 0) {
            return res.status(404).json(error);
        }

        return res.status(200).json(results);
    });
};

const getSuppliers = async (req, res) => {
    const userId = req.userId;

    const getSupplier = `SELECT COUNT(supplier_id) as total_suppliers FROM suppliers WHERE user_id = ?`;

    db.query(getSupplier, [userId], (error, results) => {
        if(error || results.length === 0) {
            return res.status(404).json(error);
        }

        return res.status(200).json(results);
    });
};

const getClients = async (req, res) => {
    const userId = req.userId;

    const getClient = `SELECT COUNT(client_id) as total_clients FROM clients WHERE user_id = ?`;

    db.query(getClient, [userId], (error, results) => {
        if(error || results.length === 0) {
            return res.status(404).json(error);
        }

        return res.status(200).json(results);
    });
};

const getInventory = async (req, res) => {
    const userId = req.userId;

    const getInventoryQuery = `SELECT SUM(quantity) as total_inventory_items FROM inventory WHERE user_id = ?`;

    db.query(getInventoryQuery, [userId], (error, results) => {
        if(error || results.length === 0) {
            return res.status(404).json(error);
        }

        return res.status(200).json(results);
    });
};

export {
    getPurchases,
    getSales,
    getPurchaseOrders,
    getSaleOrders,
    getSuppliers,
    getClients,
    getInventory
}