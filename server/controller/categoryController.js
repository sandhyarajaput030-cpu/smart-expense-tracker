import Category from "../models/Category.js";

// GET ALL
export const getCategories = async (req, res) => {
  try {
    const data = await Category.find();
    res.json(data); // MUST be array
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ADD
export const addCategory = async (req, res) => {
  try {
    const { name, type } = req.body;

    const newCat = new Category({ name, type });
    await newCat.save();

    res.status(201).json(newCat);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
export const deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE CATEGORY
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, type } = req.body;

    const updated = await Category.findByIdAndUpdate(
      id,
      { name, type },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};