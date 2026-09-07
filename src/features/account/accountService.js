import api from "../../services/api/axios";

const getAccounts = async () => {
  const response = await api.get("/api/v1/accounts");
  return response.data;
};

const getAccountById = async (accountNumber) => {
  const response = await api.get(`/api/v1/accounts/${accountNumber}`);
  return response.data;
};

const accountService = {
  getAccounts,
  getAccountById,
};

export default accountService;