import { useForm } from "react-hook-form";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

function MakePayment() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Payment Data:", data);
    alert("Payment submitted successfully (Mock)");
  };

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
          Enter the payment details below.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 rounded-xl bg-white p-6 shadow-sm"
      >
        {/* Payment Type */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Payment Type
          </label>

          <select
            {...register("paymentType", {
              required: "Payment type is required",
            })}
            className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
          >
            <option value="">Select payment type</option>
            <option value="ELECTRICITY">Electricity Bill</option>
            <option value="MOBILE">Mobile Recharge</option>
            <option value="INTERNET">Internet Bill</option>
            <option value="WATER">Water Bill</option>
            <option value="OTHER">Other</option>
          </select>

          {errors.paymentType && (
            <p className="mt-1 text-xs text-red-500">
              {errors.paymentType.message}
            </p>
          )}
        </div>

        {/* Receiver */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Receiver / Consumer Number
          </label>

          <input
            type="text"
            placeholder="Enter consumer number"
            {...register("receiver", {
              required: "Consumer number is required",
            })}
            className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
          />

          {errors.receiver && (
            <p className="mt-1 text-xs text-red-500">
              {errors.receiver.message}
            </p>
          )}
        </div>

        {/* Amount */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Amount
          </label>

          <input
            type="number"
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

        {/* Description */}
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
          className="w-full rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Pay Now
        </button>
      </form>
    </div>
  );
}

export default MakePayment;
