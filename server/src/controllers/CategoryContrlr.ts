import CategoryModel from "../model/Category.js";

export const createCategory = async (req: any, res: any) => {
  try {
    const document = new CategoryModel({
      title: req.body.title,
      description: req.body.description,
    });

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
    const animeID = req.params.id;
    await CategoryModel.updateOne(
      {
        _id: animeID,
      },
      {
        title: req.body.title,
        description: req.body.description,
      }
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
    const animeID = req.params.id;
    const result = await CategoryModel.findByIdAndRemove(animeID);
    res.json({
      success: result,
    });
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
    const animeID = req.params.id;
    const category = await CategoryModel.findById(animeID);
    res.json(category);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Cannot recieve category",
    });
  }
};
