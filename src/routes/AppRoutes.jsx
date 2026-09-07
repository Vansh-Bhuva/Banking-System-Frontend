// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Login from "../pages/auth/Login";
// import Register from "../pages/auth/Register";
// import Dashboard from "../pages/dashboard/Dashboard";
// import Accounts from "../pages/accounts/Accounts";
// import AccountDetails from "../pages/accounts/AccountDetails";
// import Transactions from "../pages/transactions/Transactions";
// import TransactionDetails from "../pages/transactions/TransactionDetails";
// import Payments from "../pages/payments/Payments";
// import MakePayment from "../pages/payments/MakePayment";
// import Profile from "../pages/profile/Profile";

// import ProtectedRoute from "./ProtectedRoute";
// import DashboardLayout from "../components/layout/DashboardLayout";

// function AppRoutes() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Public */}

//         <Route path="/login" element={<Login />} />

//         <Route path="/register" element={<Register />} />

//         {/* Protected */}

//         <Route element={<ProtectedRoute />}>
//           <Route element={<DashboardLayout />}>
//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/accounts" element={<Accounts />} />
//             <Route path="/accounts/:id" element={<AccountDetails />} />
//             <Route path="/transactions" element={<Transactions />} />
//             <Route path="/transactions/:id" element={<TransactionDetails />} />
//             <Route path="/payments" element={<Payments />} />
//             <Route path="/payments/make-payment" element={<MakePayment />} />
//             <Route path="/profile" element={<Profile />} />
//           </Route>
//         </Route>

//         {/* 404 */}

//         <Route path="*" element={<div>Page Not Found</div>} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default AppRoutes;
import { BrowserRouter, Routes, Route } from "react-router-dom";

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

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard */}
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

        {/* 404 */}
        <Route
          path="*"
          element={<div className="p-10 text-center">Page Not Found</div>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
