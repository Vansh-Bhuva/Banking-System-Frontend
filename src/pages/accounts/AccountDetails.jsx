import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeft, CreditCard, Copy } from "lucide-react";

import {
  getAccountById,
  clearSelectedAccount,
} from "../../features/account/accountSlice";

function AccountDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { selectedAccount, isLoading, isError, message } = useSelector(
    (state) => state.account,
  );

  useEffect(() => {
    dispatch(getAccountById(id));

    return () => {
      dispatch(clearSelectedAccount());
    };
  }, [dispatch, id]);

  if (isLoading) {
    return (
      <div className="rounded-2xl bg-white p-10 text-center">
        <p>Loading account details...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-2xl bg-white p-10 text-center">
        <h2 className="text-xl font-semibold text-red-600">
          Failed to load account
        </h2>

        <p className="mt-2 text-slate-500">{message}</p>

        <Link
          to="/accounts"
          className="mt-6 inline-flex items-center gap-2 text-blue-600"
        >
          <ArrowLeft size={18} />
          Back to Accounts
        </Link>
      </div>
    );
  }

  if (!selectedAccount) {
    return (
      <div className="rounded-2xl bg-white p-10 text-center">
        <h2 className="text-xl font-semibold">Account not found</h2>

        <Link
          to="/accounts"
          className="mt-6 inline-flex items-center gap-2 text-blue-600"
        >
          <ArrowLeft size={18} />
          Back to Accounts
        </Link>
      </div>
    );
  }

  const account = selectedAccount;

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
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
            <CreditCard size={26} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              {account.accountType}
            </h1>

            <p className="text-sm text-slate-500">{account.status}</p>
          </div>
        </div>

        {/* Balance */}
        <div className="mt-8 rounded-xl bg-slate-50 p-6">
          <p className="text-sm text-slate-500">Available Balance</p>

          <h2 className="mt-2 text-4xl font-bold text-slate-900">
            ₹{Number(account.balance || 0).toLocaleString("en-IN")}
          </h2>
        </div>

        {/* Account Details */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div>
            <p className="text-sm text-slate-500">Account Number</p>

            <div className="mt-2 flex items-center gap-2">
              <p className="font-medium">{account.accountNumber}</p>

              <Copy
                size={16}
                className="cursor-pointer text-slate-400"
                onClick={() =>
                  navigator.clipboard.writeText(account.accountNumber)
                }
              />
            </div>
          </div>

          <div>
            <p className="text-sm text-slate-500">Account Holder</p>

            <p className="mt-2 font-medium">{account.accountHolderName}</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Email</p>

            <p className="mt-2 font-medium">{account.email}</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Account Type</p>

            <p className="mt-2 font-medium">{account.accountType}</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Status</p>

            <p className="mt-2 font-medium text-green-600">{account.status}</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Daily Transaction Limit</p>

            <p className="mt-2 font-medium">
              ₹
              {Number(account.dailyTransactionLimit || 0).toLocaleString(
                "en-IN",
              )}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Created At</p>

            <p className="mt-2 font-medium">
              {account.createdAt
                ? new Date(account.createdAt).toLocaleString("en-IN")
                : "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountDetails;
