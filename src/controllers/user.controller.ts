import { NewUserRequestBody } from "./../types/types";
import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.model";
import { TryCatch } from "../middleware/error";
import ErrorHandler from "../utils/utility-class";

const newUser = TryCatch(
  async (
    req: Request<{}, {}, NewUserRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { name, email, dob, _id, gender, photo } = req.body;

    let user = await User.findById(_id);

    if (user) {
      return res.status(200).json({
        status: 200,
        message: `Welcome ${user.name}`,
      });
    }

    if (!_id || !name || !photo || !email || !gender || !dob) {
      next(new ErrorHandler("Please fill all feilds", 400));
    }

    user = await User.create({
      name,
      email,
      dob: new Date(dob),
      _id,
      gender,
      photo,
    });

    return res.status(201).json({
      success: true,
      message: `Welcome ${user.name}`,
    });
  }
);

const getAllUsers = TryCatch(async (req, res, next) => {
  const users = await User.find({});

  return res.status(200).json({
    success: true,
    users,
  });
});

const getUser = TryCatch(async (req, res, next) => {
  const { _id } = req.params;
  const user = await User.findById(_id);

  if (!user) return next(new ErrorHandler("Invalid Id", 404));

  return res.status(200).json({
    success: true,
    user,
  });
});

const deleteUser = TryCatch(async (req, res, next) => {
  const { _id } = req.params;
  const user = await User.findById(_id);

  if (!user) return next(new ErrorHandler("Invalid Id", 404));

  await user.deleteOne();
  return res.status(200).json({
    success: true,
    message: `User ${user.name} deleted successfully`,
  });
});
export { newUser, getAllUsers, getUser, deleteUser };
