import config from "@/api.config";
import axios from "axios";

export const addCategory =
  ({ type, name }) =>
  async (dispatch) => {
    try {
      dispatch({ type: "ACR" });
      const { data } = await axios.post(
        `${config.BACKEND_URL}/category/add`,
        { type, name },
        config.POST_CONFIG,
      );
      dispatch({ type: "ACS", payload: data });
    } catch (error) {
      dispatch({
        type: "ACF",
        payload: error.response ? error.response.data.message : error.message,
      });
    }
  };

export const fetchCategories = () => async (dispatch) => {
  try {
    dispatch({ type: "FCR" });
    const { data } = await axios.get(
      `${config.BACKEND_URL}/category/fetch/all`,
      config.GET_CONFIG,
    );
    dispatch({ type: "FCS", payload: data });
  } catch (error) {
    dispatch({
      type: "FCF",
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};

export const deleteCategory = (id) => async (dispatch) => {
  try {
    dispatch({ type: "DCR" });
    const { data } = await axios.delete(
      `${config.BACKEND_URL}/category/${id}/delete`,
      config.GET_CONFIG,
    );
    dispatch({ type: "DCS", payload: data });
  } catch (error) {
    dispatch({
      type: "DCF",
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};
