import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../../services/api/axios";

function MakePayment() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [accountNumber, setAccountNumber] = useState("");
  const [isLoadingAccount, setIsLoadingAccount] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [transaction, setTransaction] = useState(null);
  const [error, setError] = useState("");
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [verified, setVerified] = useState(false);

  const submitLock = useRef(false);

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const response = await api.get("/api/v1/accounts");

        if (response.data.length > 0) {
          setAccountNumber(response.data[0].accountNumber);
        } else {
          setError("No account found");
        }
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load account");
      } finally {
        setIsLoadingAccount(false);
      }
    };

    fetchAccount();
  }, []);

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    setError("");
    setIsVerifying(true);

    try {
      await api.post(
        `/api/v1/transactions/${transaction.id}/verify?otp=${otp}`,
      );

      setVerified(true);

      setTransaction((prev) => ({
        ...prev,
        status: "COMPLETED",
      }));
    } catch (err) {
      setError(err.response?.data?.message || "Invalid or expired OTP");
    } finally {
      setIsVerifying(false);
    }
  };

  const onSubmit = async (data) => {
    if (submitLock.current) return;

    submitLock.current = true;
    setError("");
    setIsSubmitting(true);

    try {
      const response = await api.post("/api/v1/transactions/transfer", {
        senderAccountNumber: accountNumber,
        receiverAccountNumber: data.receiverAccountNumber,
        amount: Number(data.amount),
        description: data.description,
      });

      setTransaction(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to make payment");
      submitLock.current = false;
    } finally {
      setIsSubmitting(false);
    }
  };

  if (transaction) {
    return (
      <div className="mx-auto max-w-2xl space-y-6">
        <Link
          to="/payments"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft size={18} />
          Back to Payments
        </Link>

        <div className="rounded-xl bg-white p-6 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-green-600">
            Payment Initiated
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Your transaction has been created successfully.
          </p>

          <div className="mt-6 space-y-3 text-left">
            <p>
              <span className="font-medium">Transaction ID:</span>{" "}
              {transaction.id}
            </p>

            <p>
              <span className="font-medium">Amount:</span> ₹
              {Number(transaction.amount).toLocaleString("en-IN")}
            </p>

            <p>
              <span className="font-medium">Status:</span> {transaction.status}
            </p>

            <p>
              <span className="font-medium">Reference:</span>{" "}
              {transaction.referenceNumber || "N/A"}
            </p>
          </div>

          {transaction.otpRequired && !verified ? (
            <div className="mt-6 space-y-4">
              <div className="rounded-lg bg-yellow-50 p-4 text-left">
                <p className="font-medium text-yellow-800">
                  Additional verification required
                </p>

                <p className="mt-1 text-sm text-yellow-700">
                  This transaction was flagged as suspicious. Please enter the
                  OTP sent to your email address.
                </p>
              </div>

              <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-6">
                <div className="text-center">
                  <h2 className="text-lg font-semibold text-slate-900">
                    Verify Transaction
                  </h2>

                  <p className="mt-2 text-sm text-slate-500">
                    A 6-digit OTP has been sent to your registered email
                    address.np 
                  </p>
                </div>

                <div className="mt-6">
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    placeholder="Enter 6-digit OTP"
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-center text-lg tracking-[0.5em] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {error && (
                  <p className="mt-3 text-center text-sm text-red-600">
                    {error}
                  </p>
                )}

                <button
                  type="button"
                  onClick={handleVerifyOTP}
                  disabled={isVerifying || otp.length !== 6}
                  className="mt-4 w-full rounded-lg bg-slate-900 px-4 py-3 font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isVerifying ? "Verifying..." : "Verify OTP"}
                </button>
              </div>
            </div>
          ) : verified ? (
            <div className="mt-6 rounded-lg bg-green-50 p-4 text-center">
              <p className="font-semibold text-green-700">
                OTP verified successfully
              </p>

              <p className="mt-1 text-sm text-green-600">
                Payment completed successfully.
              </p>
            </div>
          ) : (
            <div className="mt-6 rounded-lg bg-green-50 p-4 text-center">
              <p className="font-semibold text-green-700">
                Payment Completed Successfully
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (isLoadingAccount) {
    return (
      <div className="mx-auto max-w-2xl">
        <p className="text-sm text-slate-500">Loading account...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Link
        to="/payments"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900"
      >
        <ArrowLeft size={18} />
        Back to Payments
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-slate-900">Make Payment</h1>

        <p className="mt-1 text-sm text-slate-500">
          Transfer money to another bank account.
        </p>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 rounded-xl bg-white p-6 shadow-sm"
      >
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            From Account
          </label>

          <input
            type="text"
            value={accountNumber}
            readOnly
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Receiver Account Number
          </label>

          <input
            type="text"
            placeholder="Enter receiver account number"
            {...register("receiverAccountNumber", {
              required: "Receiver account number is required",
            })}
            className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
          />

          {errors.receiverAccountNumber && (
            <p className="mt-1 text-xs text-red-500">
              {errors.receiverAccountNumber.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Amount
          </label>

          <input
            type="number"
            step="0.01"
            placeholder="Enter amount"
            {...register("amount", {
              required: "Amount is required",
              min: {
                value: 1,
                message: "Amount must be greater than 0",
              },
            })}
            className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
          />

          {errors.amount && (
            <p className="mt-1 text-xs text-red-500">{errors.amount.message}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Description
          </label>

          <textarea
            rows="3"
            placeholder="Payment description"
            {...register("description")}
            className="w-full resize-none rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !accountNumber}
          className="w-full rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "Processing..." : "Pay Now"}
        </button>
      </form>
    </div>
  );
}

export default MakePayment;