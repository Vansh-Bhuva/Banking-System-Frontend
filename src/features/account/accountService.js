import api from "../../services/api/axios";

const getAccounts = async () => {
  const response = await api.get("/accounts");
  return response.data;
};

const getAccountById = async (id) => {
  const response = await api.get(`/accounts/${id}`);
  return response.data;
};

const accountService = {
  getAccounts,
  getAccountById,
};

export default accountService;