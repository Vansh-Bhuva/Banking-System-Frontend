export const mockAccounts = [
  {
    id: 1,
    accountNumber: "100012345678",
    accountType: "Savings Account",
    balance: 25480,
    currency: "INR",
    status: "ACTIVE",
  },
  {
    id: 2,
    accountNumber: "100098765432",
    accountType: "Current Account",
    balance: 85200,
    currency: "INR",
    status: "ACTIVE",
  },
];

export const mockTransactions = [
  {
    id: 1,
    title: "Salary Credit",
    type: "CREDIT",
    amount: 45000,
    date: "2026-09-06",
    status: "COMPLETED",
  },
  {
    id: 2,
    title: "Electricity Bill",
    type: "DEBIT",
    amount: 2450,
    date: "2026-09-05",
    status: "COMPLETED",
  },
  {
    id: 3,
    title: "Amazon Payment",
    type: "DEBIT",
    amount: 1299,
    date: "2026-09-04",
    status: "COMPLETED",
  },
  {
    id: 4,
    title: "Money Received",
    type: "CREDIT",
    amount: 5000,
    date: "2026-09-03",
    status: "COMPLETED",
  },
];

export const mockPayments = [
  {
    id: 1,
    title: "Electricity Bill",
    amount: 2450,
    date: "2026-09-05",
    status: "PAID",
  },
  {
    id: 2,
    title: "Mobile Recharge",
    amount: 599,
    date: "2026-09-02",
    status: "PAID",
  },
];
