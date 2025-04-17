import config from "@/api.config";
import axios from "axios";

export const addTransaction =
  ({ type, category, amount, date, description }) =>
  async (dispatch) => {
    try {
      dispatch({ type: "ATR" });
      const { data } = await axios.post(
        `${config.BACKEND_URL}/transaction/add`,
        {
          type,
          category,
          amount,
          date,
          description,
        },
        config.POST_CONFIG,
      );
      dispatch({ type: "ATS", payload: data });
    } catch (error) {
      dispatch({
        type: "ATF",
        payload: error.response ? error.response.data.message : error.message,
      });
    }
  };

export const fetchTransactions =
  (fromDate = "", toDate = "", type = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: "FTR" });
      const { data } = await axios.get(
        `${config.BACKEND_URL}/transaction/fetch/all?fromDate=${fromDate}&toDate=${toDate}&type=${type}`,
        config.GET_CONFIG,
      );
      dispatch({ type: "FTS", payload: data });
    } catch (error) {
      dispatch({
        type: "FTF",
        payload: error.response ? error.response.data.message : error.message,
      });
    }
  };

export const deleteTransaction = (id) => async (dispatch) => {
  try {
    dispatch({ type: "DTR" });
    const { data } = await axios.delete(
      `${config.BACKEND_URL}/transaction/${id}/delete`,
      config.GET_CONFIG,
    );
    dispatch({ type: "DTS", payload: data.message });
  } catch (error) {
    dispatch({
      type: "DTF",
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};
