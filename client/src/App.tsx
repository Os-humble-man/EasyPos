import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import DashboardPage from "./pages/Dashboard";
import AdminDashboardPage from "./pages/admin/dashboard";
import UsersPage from "./pages/Users";
import TaxesPage from "./pages/Taxes";
import POSPage from "./pages/Pos";
import InvoicePage from "./components/Invoice";
import PrivateRoute from "./components/PrivateRoute";
// import { useAuthStore } from "./store/authStore";
// import { useEffect } from "react";

const App: React.FC = () => {
  // const { checkAuth } = useAuthStore();

  // useEffect(() => {
  //   checkAuth();
  // }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin/users" element={<UsersPage />} />
          <Route path="/admin/taxes" element={<TaxesPage />} />
          <Route path="/admin/pos" element={<POSPage />} />
          {/* Ajoutez le paramètre dynamique :id à la route /invoice */}
          <Route path="/invoice/:id" element={<InvoicePage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
