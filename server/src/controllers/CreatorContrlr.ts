import CreatorModel from "../model/Creator.js";

import fs from "fs";

export const createCreator = async (req: any, res: any) => {
  try {
    const document = new CreatorModel({
      fullname: req.body.fullname,
      description: req.body.description,
      imgUrl: req.body.imgUrl,
    });

    const creator = await document.save();
    res.json(creator);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Creating creator failed",
    });
  }
};

export const updateCreator = async (req: any, res: any) => {
  try {
    const creatorID = req.params.id;
    await CreatorModel.updateOne(
      {
        _id: creatorID,
      },
      {
        fullname: req.body.fullname,
        description: req.body.description,
        imgUrl: req.body.imgUrl,
      }
    );

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Cannot update creator",
    });
  }
};

export const removeCreator = async (req: any, res: any) => {
  try {
    const creatorID = req.params.id;
    const creator = await CreatorModel.findById(creatorID);
    if (creator) {
      if (fs.existsSync(`../server/${creator.imgUrl}`)) {
        fs.unlink(`../server/${creator.imgUrl}`, (err) => {
          if (err) console.warn(err);
        });
      }
    }
    const result = await CreatorModel.findByIdAndRemove(creatorID);
    res.json({
      success: result,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Cannot find creator",
    });
  }
};

export const getAllCreators = async (req: any, res: any) => {
  try {
    const creators = await CreatorModel.find();
    res.json(creators);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Cannot recieve creators",
    });
  }
};

export const getOneCreator = async (req: any, res: any) => {
  try {
    const creatorID = req.params.id;
    const creators = await CreatorModel.findById(creatorID);
    res.json(creators);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Cannot recieve creator",
    });
  }
};
