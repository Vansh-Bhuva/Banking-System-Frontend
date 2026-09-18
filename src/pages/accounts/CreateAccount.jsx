import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";

import api from "../../services/api/axios";

function CreateAccount() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    accountHolderName: "",
    email: "",
    phone: "",
    accountType: "SAVINGS",
    initialDeposit: "",
    dailyTransactionLimit: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setIsLoading(true);

    try {
      const response = await api.post("/api/v1/accounts", {
        ...formData,
        initialDeposit: Number(formData.initialDeposit),
        dailyTransactionLimit: Number(formData.dailyTransactionLimit),
      });

      navigate(`/accounts/${response.data.accountNumber}`);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create account");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Link
        to="/accounts"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600"
      >
        <ArrowLeft size={18} />
        Back to Accounts
      </Link>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">Create Account</h1>

        <p className="mt-1 text-sm text-slate-500">
          Enter the details to create a new bank account.
        </p>

        {error && (
          <div className="mt-5 rounded-lg bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Account Holder Name
            </label>

            <input
              type="text"
              name="accountHolderName"
              value={formData.accountHolderName}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              placeholder="Enter account holder name"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Email</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              placeholder="Enter email"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Account Type
            </label>

            <select
              name="accountType"
              value={formData.accountType}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
            >
              <option value="SAVINGS">Savings</option>
              <option value="CURRENT">Current</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Phone</label>

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              placeholder="Enter phone number"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Initial Balance
            </label>

            <input
              type="number"
              name="initialDeposit"
              value={formData.initialDeposit}
              onChange={handleChange}
              min="0"
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              placeholder="Enter initial balance"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Daily Transaction Limit
            </label>

            <input
              type="number"
              name="dailyTransactionLimit"
              value={formData.dailyTransactionLimit}
              onChange={handleChange}
              min="0"
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              placeholder="Enter daily transaction limit"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 font-medium text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {isLoading && <Loader2 size={18} className="animate-spin" />}

            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateAccount;
