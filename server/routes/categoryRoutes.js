import express from "express";
import {
  getCategories,
  addCategory,
  deleteCategory,
  updateCategory,
} from "../controller/categoryController.js";

const router = express.Router();

router.get("/", getCategories);
router.post("/", addCategory);
router.delete("/:id", deleteCategory);
router.put("/:id", updateCategory);

export default router;