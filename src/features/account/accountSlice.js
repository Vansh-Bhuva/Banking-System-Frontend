import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import accountService from "./accountService";

const initialState = {
  accounts: [],
  selectedAccount: null,
  isLoading: false,
  isError: false,
  message: "",
};

export const getAccounts = createAsyncThunk(
  "account/getAccounts",
  async (_, thunkAPI) => {
    try {
      return await accountService.getAccounts();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to load accounts"
      );
    }
  }
);

export const getAccountById = createAsyncThunk(
  "account/getAccountById",
  async (id, thunkAPI) => {
    try {
      return await accountService.getAccountById(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to load account"
      );
    }
  }
);

const accountSlice = createSlice({
  name: "account",

  initialState,

  reducers: {
    clearSelectedAccount: (state) => {
      state.selectedAccount = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(getAccounts.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })

      .addCase(getAccounts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.accounts = action.payload;
      })

      .addCase(getAccounts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(getAccountById.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(getAccountById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedAccount = action.payload;
      })

      .addCase(getAccountById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { clearSelectedAccount } = accountSlice.actions;

export default accountSlice.reducer;