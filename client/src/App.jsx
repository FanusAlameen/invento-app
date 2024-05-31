import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import MainLayout from "./components/Home/MainLayout";
import Dashboard from "./components/Home/Dashboard";
import Purchase from "./components/Home/purchase/Purchase";
import Sales from "./components/Home/sale/Sales";
import Product from "./components/Home/product/Product";
import Suppliers from "./components/Home/suppliers/Suppliers";
import Clients from "./components/Home/clients/Clients";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Dashboard />} />
          <Route path="purchase" element={<Purchase />} />
          <Route path="sale" element={<Sales />} />
          <Route path="product" element={<Product />} />
          <Route path="suppliers" element={<Suppliers />} />
          <Route path="clients" element={<Clients />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
