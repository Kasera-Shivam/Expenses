import utils from "./utils.js";
import jwt from "jsonwebtoken";
import { User } from "./models/user.model.js";

const ValidateSchema = (Schema) => async (req, res, next) => {
  try {
    await Schema.parse(req.body);
    next();
  } catch (error) {
    if (error.errors) return utils.SendError(res, 400, null, "Schema error.");
    return utils.SendError(res, 500, null, error);
  }
};

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies["auth-token"];
    if (!token) return utils.SendError(res, 404, null);
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodeToken.id);
    if (!user) return utils.SendError(res, 404, null);
    req.user = user;
    next();
  } catch (error) {
    return utils.SendError(res, 500, null, error);
  }
};

export default { ValidateSchema, isAuthenticated };
