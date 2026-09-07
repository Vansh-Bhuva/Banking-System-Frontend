import { Link } from "react-router-dom";
import { CheckCircle, CreditCard, Plus } from "lucide-react";
import { mockPayments } from "../../utils/mockData";

function Payments() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Payments</h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage your bills and payments.
          </p>
        </div>

        <Link
          to="/payments/make-payment"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          <Plus size={18} />
          Make Payment
        </Link>
      </div>

      {/* Payment Cards */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="rounded-lg bg-blue-100 p-3 text-blue-600">
              <CreditCard size={22} />
            </div>
          </div>

          <p className="mt-4 text-sm text-slate-500">Total Payments</p>

          <h2 className="mt-1 text-2xl font-bold text-slate-900">
            {mockPayments.length}
          </h2>
        </div>

        <div className="rounded-xl bg-white p-5 shadow-sm">
          <div className="rounded-lg bg-green-100 p-3 text-green-600 w-fit">
            <CheckCircle size={22} />
          </div>

          <p className="mt-4 text-sm text-slate-500">Successful Payments</p>

          <h2 className="mt-1 text-2xl font-bold text-slate-900">
            {mockPayments.filter((payment) => payment.status === "PAID").length}
          </h2>
        </div>

        <div className="rounded-xl bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Total Amount Paid</p>

          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            ₹
            {mockPayments
              .reduce((total, payment) => total + payment.amount, 0)
              .toLocaleString("en-IN")}
          </h2>
        </div>
      </div>

      {/* Payment History */}
      <div className="rounded-xl bg-white shadow-sm">
        <div className="border-b px-6 py-4">
          <h2 className="font-semibold text-slate-900">Payment History</h2>
        </div>

        <div className="divide-y">
          {mockPayments.map((payment) => (
            <div
              key={payment.id}
              className="flex flex-col gap-3 px-6 py-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-blue-100 p-3 text-blue-600">
                  <CreditCard size={20} />
                </div>

                <div>
                  <h3 className="font-medium text-slate-900">
                    {payment.title}
                  </h3>

                  <p className="text-sm text-slate-500">{payment.date}</p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-6 sm:justify-end">
                <span className="font-semibold text-slate-900">
                  ₹{payment.amount.toLocaleString("en-IN")}
                </span>

                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                  {payment.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Payments;
