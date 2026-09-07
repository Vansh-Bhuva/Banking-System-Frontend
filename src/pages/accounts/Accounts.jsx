import { Link } from "react-router-dom";
import { CreditCard, Eye, Plus } from "lucide-react";

import { mockAccounts } from "../../utils/mockData";

function Accounts() {
  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Accounts</h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage and view all your bank accounts.
          </p>
        </div>

        <button className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700">
          <Plus size={18} />
          Open Account
        </button>
      </div>

      {/* Account Cards */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {mockAccounts.map((account) => (
          <div
            key={account.id}
            className="rounded-2xl bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                <CreditCard size={23} />
              </div>

              <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-600">
                {account.status}
              </span>
            </div>

            <div className="mt-6">
              <p className="text-sm text-slate-500">{account.accountType}</p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                ₹{account.balance.toLocaleString("en-IN")}
              </h2>

              <p className="mt-3 text-sm text-slate-500">Account No.</p>

              <p className="font-medium text-slate-700">
                **** **** {account.accountNumber.slice(-4)}
              </p>
            </div>

            <Link
              to={`/accounts/${account.id}`}
              className="mt-6 flex items-center justify-center gap-2 rounded-lg bg-slate-100 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-200"
            >
              <Eye size={17} />
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Accounts;
