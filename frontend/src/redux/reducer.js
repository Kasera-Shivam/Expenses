import { createReducer } from "@reduxjs/toolkit";

const userReducer = createReducer(
  { loading: true, user: null, error: null, message: null },
  (builder) => {
    builder
      .addCase("FUR", (state) => {
        state.loading = true;
      })
      .addCase("FUS", (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase("FUF", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase("LOGOUT", (state) => {
        state.user = null;
        state.message = "Logout successfully.";
      })

      .addCase("CE", (state) => {
        state.error = null;
      })
      .addCase("CM", (state) => {
        state.message = null;
      });
  },
);

const categoryReducer = createReducer(
  { loading: true, categories: [], error: null, message: null },
  (builder) => {
    builder
      .addCase("ACR", (state) => {
        state.loading = true;
      })
      .addCase("ACS", (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase("ACF", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase("FCR", (state) => {
        state.loading = true;
      })
      .addCase("FCS", (state, action) => {
        state.loading = false;
        state.categories = action.payload.categories;
      })
      .addCase("FCF", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase("DCR", (state) => {
        state.loading = true;
      })
      .addCase("DCS", (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase("DCF", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase("CE", (state) => {
        state.error = null;
      })
      .addCase("CM", (state) => {
        state.message = null;
      });
  },
);

const transactionReducer = createReducer(
  { loading: true, transactions: [], error: null, message: null },
  (builder) => {
    builder
      .addCase("ATR", (state) => {
        state.loading = true;
      })
      .addCase("ATS", (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase("ATF", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase("FTR", (state) => {
        state.loading = true;
      })
      .addCase("FTS", (state, action) => {
        state.loading = false;
        state.transactions = action.payload.transactions;
      })
      .addCase("FTF", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase("DTR", (state) => {
        state.loading = true;
      })
      .addCase("DTS", (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase("DTF", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase("CE", (state) => {
        state.error = null;
      })
      .addCase("CM", (state) => {
        state.message = null;
      });
  },
);

export default { userReducer, categoryReducer, transactionReducer };
