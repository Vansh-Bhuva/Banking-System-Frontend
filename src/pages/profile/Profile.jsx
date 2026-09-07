import { useState } from "react";
import { User, Mail, Phone, MapPin, Pencil, ShieldCheck } from "lucide-react";

function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  const [user, setUser] = useState({
    firstName: "Vansh",
    lastName: "Bhuva",
    email: "vansh@example.com",
    phone: "+91 98765 43210",
    address: "Ahmedabad, Gujarat, India",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    alert("Profile updated successfully (Mock)");
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">My Profile</h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage your personal information and account details.
        </p>
      </div>

      {/* Profile Header */}
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-2xl font-bold text-blue-600">
            {user.firstName.charAt(0)}
            {user.lastName.charAt(0)}
          </div>

          <div className="text-center sm:text-left">
            <h2 className="text-xl font-bold text-slate-900">
              {user.firstName} {user.lastName}
            </h2>

            <p className="text-sm text-slate-500">Customer</p>

            <div className="mt-2 flex items-center justify-center gap-2 text-sm text-green-600 sm:justify-start">
              <ShieldCheck size={16} />
              Account Verified
            </div>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <form
        onSubmit={handleSubmit}
        className="rounded-xl bg-white p-6 shadow-sm"
      >
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Personal Information
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Your basic account information.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            <Pencil size={16} />
            {isEditing ? "Cancel" : "Edit"}
          </button>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {/* First Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              First Name
            </label>

            <div className="relative">
              <User
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                name="firstName"
                value={user.firstName}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full rounded-lg border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none disabled:bg-slate-50"
              />
            </div>
          </div>

          {/* Last Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Last Name
            </label>

            <input
              name="lastName"
              value={user.lastName}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none disabled:bg-slate-50"
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Email
            </label>

            <div className="relative">
              <Mail
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                name="email"
                type="email"
                value={user.email}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full rounded-lg border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none disabled:bg-slate-50"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Phone
            </label>

            <div className="relative">
              <Phone
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                name="phone"
                value={user.phone}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full rounded-lg border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none disabled:bg-slate-50"
              />
            </div>
          </div>

          {/* Address */}
          <div className="sm:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Address
            </label>

            <div className="relative">
              <MapPin
                size={18}
                className="absolute left-3 top-3 text-slate-400"
              />

              <textarea
                name="address"
                rows="3"
                value={user.address}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full resize-none rounded-lg border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none disabled:bg-slate-50"
              />
            </div>
          </div>
        </div>

        {/* Save */}
        {isEditing && (
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default Profile;
