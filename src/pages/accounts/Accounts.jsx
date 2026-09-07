import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CreditCard, Eye, Plus } from "lucide-react";

import { getAccounts } from "../../features/account/accountSlice";

function Accounts() {
  const dispatch = useDispatch();

  const { accounts, isLoading, isError, message } = useSelector(
    (state) => state.account,
  );

  useEffect(() => {
    dispatch(getAccounts());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <p>Loading accounts...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500">{message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Accounts</h1>
          <p className="text-slate-500">Manage your banking accounts</p>
        </div>

        <Link
          to="/accounts/create"
          className="flex items-center gap-2 rounded-lg px-4 py-2 bg-blue-600 text-white"
        >
          <Plus size={18} />
          Create Account
        </Link>
      </div>

      {accounts.length === 0 ? (
        <div className="rounded-xl border p-10 text-center">
          <CreditCard className="mx-auto mb-3" size={40} />
          <h2 className="text-lg font-semibold">No accounts found</h2>
          <p className="text-slate-500">You don't have any accounts yet.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {accounts.map((account) => (
            <div
              key={account.accountNumber}
              className="rounded-xl border bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <CreditCard size={28} />

                <Link
                  to={`/accounts/${account.accountNumber}`}
                  className="text-blue-600"
                >
                  <Eye size={20} />
                </Link>
              </div>

              <div className="mt-5">
                <p className="text-sm text-slate-500">Account Number</p>

                <p className="font-semibold">{account.accountNumber}</p>
              </div>

              <div className="mt-4">
                <p className="text-sm text-slate-500">Account Type</p>

                <p className="font-semibold">{account.accountType}</p>
              </div>

              <div className="mt-4">
                <p className="text-sm text-slate-500">Balance</p>

                <p className="text-xl font-bold">
                  ₹{Number(account.balance || 0).toLocaleString()}
                </p>
              </div>

              <Link
                to={`/accounts/${account.accountNumber}`}
                className="mt-5 block rounded-lg bg-slate-900 px-4 py-2 text-center text-white"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Accounts;
