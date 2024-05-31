import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/auth/authSlice";
import dashboardReducer from "../slices/api/dashboardSlice";
import productReducer from "../slices/api/productSlice";
import suppleirReducer from "../slices/api/supplierSlice";
import clientReducer from "../slices/api/clientSlice";
import purchaseReducer from "../slices/api/purchaseSlice";
import saleReducer from "../slices/api/saleSlice";
import userReducer from "../slices/api/userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    products: productReducer,
    suppliers: suppleirReducer,
    clients: clientReducer,
    purchases: purchaseReducer,
    sales: saleReducer,
    users: userReducer,
  },
});
