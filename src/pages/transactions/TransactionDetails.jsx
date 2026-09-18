import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../../services/api/axios";

function TransactionDetails() {
  const { id } = useParams();

  const [transaction, setTransaction] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const response = await api.get(`/api/v1/transactions/${id}`);
        setTransaction(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load transaction");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransaction();
  }, [id]);

  if (isLoading) {
    return <div>Loading transaction...</div>;
  }

  if (error || !transaction) {
    return (
      <div className="rounded-xl bg-white p-8 text-center shadow-sm">
        <h2 className="text-xl font-semibold text-slate-800">
          Transaction Not Found
        </h2>

        <Link to="/transactions" className="mt-4 inline-block text-blue-600">
          Back to Transactions
        </Link>
      </div>
    );
  }

  const isCredit = transaction.type === "CREDIT";

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Link
        to="/transactions"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900"
      >
        <ArrowLeft size={18} />
        Back to Transactions
      </Link>

      <div className="rounded-xl bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">
          Transaction Details
        </h1>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div>
            <p className="text-sm text-slate-500">Transaction</p>
            <p className="mt-1 font-medium text-slate-900">
              {transaction.description || "Transaction"}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Transaction ID</p>
            <p className="mt-1 font-medium text-slate-900">#{transaction.id}</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Amount</p>
            <p
              className={`mt-1 text-xl font-bold ${
                isCredit ? "text-green-600" : "text-red-600"
              }`}
            >
              {isCredit ? "+" : "-"}₹
              {Number(transaction.amount).toLocaleString("en-IN")}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Type</p>
            <p className="mt-1 font-medium text-slate-900">
              {transaction.type}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Date</p>
            <p className="mt-1 font-medium text-slate-900">
              {new Date(transaction.createdAt).toLocaleString("en-IN")}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Status</p>
            <span className="mt-1 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
              {transaction.status}
            </span>
          </div>

          <div>
            <p className="text-sm text-slate-500">Sender Account</p>
            <p className="mt-1 font-medium text-slate-900">
              {transaction.senderAccountNumber}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Receiver Account</p>
            <p className="mt-1 font-medium text-slate-900">
              {transaction.receiverAccountNumber}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Reference Number</p>
            <p className="mt-1 font-medium text-slate-900">
              {transaction.referenceNumber || "N/A"}
            </p>
          </div>

          {transaction.failureReason && (
            <div>
              <p className="text-sm text-slate-500">Failure Reason</p>
              <p className="mt-1 font-medium text-red-600">
                {transaction.failureReason}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TransactionDetails;
