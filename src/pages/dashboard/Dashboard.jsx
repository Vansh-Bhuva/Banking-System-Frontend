import { Wallet, ArrowUpRight, ArrowDownLeft, CreditCard } from "lucide-react";

function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}

      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>

        <p className="mt-1 text-sm text-slate-500">
          Welcome back! Here's your banking overview.
        </p>
      </div>

      {/* Balance Cards */}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl bg-blue-600 p-5 text-white shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-blue-100">Total Balance</p>

            <Wallet size={22} />
          </div>

          <h2 className="mt-4 text-3xl font-bold">₹25,480.00</h2>

          <p className="mt-2 text-sm text-blue-100">Available balance</p>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Money Received</p>

            <ArrowDownLeft className="text-green-600" size={22} />
          </div>

          <h2 className="mt-4 text-2xl font-bold text-slate-900">₹12,850.00</h2>

          <p className="mt-2 text-sm text-green-600">This month</p>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Money Sent</p>

            <ArrowUpRight className="text-red-500" size={22} />
          </div>

          <h2 className="mt-4 text-2xl font-bold text-slate-900">₹7,420.00</h2>

          <p className="mt-2 text-sm text-red-500">This month</p>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Accounts</p>

            <CreditCard className="text-blue-600" size={22} />
          </div>

          <h2 className="mt-4 text-2xl font-bold text-slate-900">2</h2>

          <p className="mt-2 text-sm text-slate-500">Active accounts</p>
        </div>
      </div>

      {/* Recent Transactions */}

      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-slate-900">
              Recent Transactions
            </h2>

            <p className="text-sm text-slate-500">
              Your latest banking activity
            </p>
          </div>

          <button className="text-sm font-medium text-blue-600 hover:underline">
            View All
          </button>
        </div>

        <div className="divide-y">
          {[
            ["Salary Credit", "+₹45,000", "Today"],
            ["Electricity Bill", "-₹2,450", "Yesterday"],
            ["Amazon Payment", "-₹1,299", "Sep 04"],
          ].map(([title, amount, date]) => (
            <div key={title} className="flex items-center justify-between py-4">
              <div>
                <p className="font-medium text-slate-800">{title}</p>

                <p className="text-xs text-slate-500">{date}</p>
              </div>

              <p
                className={`font-semibold ${
                  amount.startsWith("+") ? "text-green-600" : "text-red-500"
                }`}
              >
                {amount}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
