import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import Dashboard from "../pages/dashboard/Dashboard";

import Accounts from "../pages/accounts/Accounts";
import AccountDetails from "../pages/accounts/AccountDetails";

import Transactions from "../pages/transactions/Transactions";
import TransactionDetails from "../pages/transactions/TransactionDetails";

import Payments from "../pages/payments/Payments";
import MakePayment from "../pages/payments/MakePayment";

import Profile from "../pages/profile/Profile";

import DashboardLayout from "../components/layout/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Accounts */}
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/accounts/:id" element={<AccountDetails />} />

            {/* Transactions */}
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/transactions/:id" element={<TransactionDetails />} />

            {/* Payments */}
            <Route path="/payments" element={<Payments />} />
            <Route path="/payments/make-payment" element={<MakePayment />} />

            {/* Profile */}
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>

        {/* Root */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* 404 */}
        <Route
          path="*"
          element={
            <div className="p-10 text-center">
              <h1 className="text-2xl font-bold">Page Not Found</h1>

              <p className="mt-2 text-slate-500">
                The page you are looking for does not exist.
              </p>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
