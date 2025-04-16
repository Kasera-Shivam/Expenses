import config from "@/api.config";
import axios from "axios";

export const fetchMyAccount = () => async (dispatch) => {
  try {
    dispatch({ type: "FUR" });
    const { data } = await axios.get(
      `${config.BACKEND_URL}/account/fetch/me`,
      config.GET_CONFIG,
    );
    dispatch({ type: "FUS", payload: data.user });
  } catch (error) {
    dispatch({
      type: "FUF",
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};
