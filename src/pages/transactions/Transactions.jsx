import { Link } from "react-router-dom";
import { ArrowDownLeft, ArrowUpRight, Eye, Search } from "lucide-react";
import { useState } from "react";
import { mockTransactions } from "../../utils/mockData";

function Transactions() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("ALL");

  const filteredTransactions = mockTransactions.filter((transaction) => {
    const matchesSearch = transaction.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesType = type === "ALL" || transaction.type === type;

    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Transactions</h1>
        <p className="mt-1 text-sm text-slate-500">
          View and manage your banking transactions.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 rounded-xl bg-white p-4 shadow-sm md:flex-row">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search transactions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500"
          />
        </div>

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none"
        >
          <option value="ALL">All Transactions</option>
          <option value="CREDIT">Credit</option>
          <option value="DEBIT">Debit</option>
        </select>
      </div>

      {/* Transactions */}
      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left">
            <thead className="border-b bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                  Transaction
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                  Date
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                  Type
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                  Amount
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                  Status
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredTransactions.map((transaction) => {
                const isCredit = transaction.type === "CREDIT";

                return (
                  <tr
                    key={transaction.id}
                    className="border-b last:border-0 hover:bg-slate-50"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`rounded-full p-2 ${
                            isCredit
                              ? "bg-green-100 text-green-600"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {isCredit ? (
                            <ArrowDownLeft size={18} />
                          ) : (
                            <ArrowUpRight size={18} />
                          )}
                        </div>

                        <span className="font-medium text-slate-800">
                          {transaction.title}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-500">
                      {transaction.date}
                    </td>

                    <td className="px-6 py-4 text-sm">
                      <span
                        className={
                          isCredit
                            ? "font-medium text-green-600"
                            : "font-medium text-red-600"
                        }
                      >
                        {transaction.type}
                      </span>
                    </td>

                    <td
                      className={`px-6 py-4 font-semibold ${
                        isCredit ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {isCredit ? "+" : "-"}₹
                      {transaction.amount.toLocaleString("en-IN")}
                    </td>

                    <td className="px-6 py-4">
                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                        {transaction.status}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <Link
                        to={`/transactions/${transaction.id}`}
                        className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800"
                      >
                        <Eye size={16} />
                        View
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredTransactions.length === 0 && (
          <div className="p-10 text-center text-sm text-slate-500">
            No transactions found.
          </div>
        )}
      </div>
    </div>
  );
}

export default Transactions;
