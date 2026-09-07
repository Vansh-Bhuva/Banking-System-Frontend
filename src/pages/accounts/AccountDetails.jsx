import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CreditCard, Copy } from "lucide-react";

import { mockAccounts } from "../../utils/mockData";

function AccountDetails() {
  const { id } = useParams();

  const account = mockAccounts.find((item) => item.id === Number(id));

  if (!account) {
    return (
      <div className="rounded-2xl bg-white p-10 text-center">
        <h2 className="text-xl font-semibold">Account not found</h2>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link
        to="/accounts"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600"
      >
        <ArrowLeft size={18} />
        Back to Accounts
      </Link>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
            <CreditCard size={26} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              {account.accountType}
            </h1>

            <p className="text-sm text-slate-500">Active Account</p>
          </div>
        </div>

        <div className="mt-8 rounded-xl bg-slate-50 p-6">
          <p className="text-sm text-slate-500">Available Balance</p>

          <h2 className="mt-2 text-4xl font-bold text-slate-900">
            ₹{account.balance.toLocaleString("en-IN")}
          </h2>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div>
            <p className="text-sm text-slate-500">Account Number</p>

            <div className="mt-2 flex items-center gap-2">
              <p className="font-medium">{account.accountNumber}</p>

              <Copy size={16} className="text-slate-400" />
            </div>
          </div>

          <div>
            <p className="text-sm text-slate-500">Account Type</p>

            <p className="mt-2 font-medium">{account.accountType}</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Currency</p>

            <p className="mt-2 font-medium">{account.currency}</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Status</p>

            <p className="mt-2 font-medium text-green-600">{account.status}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountDetails;
