import { adminOnly } from "./../middleware/auth";
import express from "express";
import {
  newUser,
  getAllUsers,
  getUser,
  deleteUser,
} from "../controllers/user.controller";

const router = express.Router();

router.post("/new", newUser);

router.get("/all", adminOnly, getAllUsers);

router.route("/:id").get(getUser).delete(adminOnly, deleteUser);

export default router;
