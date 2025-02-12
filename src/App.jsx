import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/LogIn";
import Dashboard from "./pages/Dashboard/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import ProductCategories from "./pages/Dashboard/DashboardPages/ProductCategories";
import CreateCategory from "./pages/Dashboard/DashboardPages/CreateCategory";
import Products from "./pages/Dashboard/DashboardPages/Products";
import CreateProduct from "./pages/Dashboard/DashboardPages/CreateProduct";
import "./App.css";

function App() {
  return (
    
        <Router>
          <Routes>
            {/* Public Route */}
            <Route path="/" element={<Login />} />
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/dashboard/categories" element={<ProtectedRoute><ProductCategories /></ProtectedRoute>} />
            <Route path="/dashboard/create-category" element={<ProtectedRoute><CreateCategory /></ProtectedRoute>} />
            <Route path="/dashboard/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
            <Route path="/dashboard/create-product" element={<ProtectedRoute><CreateProduct /></ProtectedRoute>} />
          </Routes>
       </Router>
  );
}

export default App;
