import utils from "../utils.js";
import jwt from "jsonwebtoken";

const login = async (req, res) => {
  try {
    const user = req.user;
    if (!user)
      return utils.SendError(
        res,
        400,
        "Something went wrong during login process."
      );
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.cookie("auth-token", token, {
      maxAge: process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
    });
    return res.redirect(process.env.FRONTEND_URL);
  } catch (error) {
    return utils.SendError(res, 500, null, error);
  }
};

const fetchMyAccount = async (req, res) => {
  try {
    const user = req.user;
    return utils.SendSuccess(res, 200, null, { user });
  } catch (error) {
    return utils.SendError(res, 500, null, error);
  }
};

export default { login, fetchMyAccount };
