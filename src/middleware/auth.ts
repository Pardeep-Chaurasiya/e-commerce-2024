import { User } from "../models/user.model";
import ErrorHandler from "../utils/utility-class";
import { TryCatch } from "./error";

export const adminOnly = TryCatch(async (req, res, next) => {
  const { id } = req.query;

  if (!id) return next(new ErrorHandler("You are not authorized", 401));

  const user = await User.findById(id);
  if (!user) return next(new ErrorHandler("Invalid Id", 404));

  if (user.role !== "admin")
    return next(new ErrorHandler("You are not authorized", 401));

  next();
});
