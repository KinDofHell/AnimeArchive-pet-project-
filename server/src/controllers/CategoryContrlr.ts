import CategoryModel from "../model/Category.js";

export const createCategory = async (req: any, res: any) => {
  try {
    const document = new CategoryModel(req.body);

    const category = await document.save();
    res.json(category);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Creating category failed",
    });
  }
};

export const updateCategory = async (req: any, res: any) => {
  try {
    const categoryID = req.params.id;
    await CategoryModel.updateOne(
      {
        _id: categoryID,
      },
      req.body
    );

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Cannot update category",
    });
  }
};

export const removeCategory = async (req: any, res: any) => {
  try {
    const categoryID = req.params.id;
    await CategoryModel.findByIdAndRemove(categoryID);
    res.status(204);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Cannot find category",
    });
  }
};

export const getAllCategories = async (req: any, res: any) => {
  try {
    const categories = await CategoryModel.find();
    res.json(categories);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Cannot recieve categories",
    });
  }
};

export const getOneCategory = async (req: any, res: any) => {
  try {
    const categoryID = req.params.id;
    const category = await CategoryModel.findById(categoryID);
    res.json(category);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Cannot recieve category",
    });
  }
};
