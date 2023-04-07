import MangaModel from "../model/Manga.js";

import fs from "fs";

export const createManga = async (req: any, res: any) => {
  try {
    const document = new MangaModel({
      title: req.body.title,
      originTitle: req.body.originTitle,
      description: req.body.description,
      categoriesArray: req.body.categoriesArray,
      chapters: req.body.chapters,
      years: req.body.years.split(","),
      status: req.body.status,
      author: req.body.author,
      imgCover: req.body.imgCover,
      imgAdditional_1: req.body.imgAdditional_1,
      imgAdditional_2: req.body.imgAdditional_2,
      imgAdditional_3: req.body.imgAdditional_3,
    });

    const manga = await document.save();
    res.json(manga);
  } catch (err) {
    console.warn(err);
    res.status(500).json({
      message: "Creating manga failed",
    });
  }
};

export const updateManga = async (req: any, res: any) => {
  try {
    const mangaID = req.params.id;
    await MangaModel.updateOne(
      {
        _id: mangaID,
      },
      {
        title: req.body.title,
        originTitle: req.body.originTitle,
        description: req.body.description,
        categoriesArray: req.body.categoriesArray,
        chapters: req.body.chapters,
        years: req.body.years.split(","),
        status: req.body.status,
        author: req.body.author,
        imgCover: req.body.imgCover,
        imgAdditional_1: req.body.imgAdditional_1,
        imgAdditional_2: req.body.imgAdditional_2,
        imgAdditional_3: req.body.imgAdditional_3,
      }
    );

    res.json({
      success: true,
    });
  } catch (err) {
    console.warn(err);
    res.status(500).json({
      message: "Cannot update manga",
    });
  }
};

export const removeManga = async (req: any, res: any) => {
  try {
    const mangaID = req.params.id;
    const manga = await MangaModel.findById(mangaID);
    if (manga) {
      if (manga.imgCover) {
        if (fs.existsSync(`../server/${manga.imgCover}`)) {
          fs.unlink(`../server/${manga.imgCover}`, (err) => {
            if (err) console.warn(err);
          });
        }
        if (fs.existsSync(`../server/${manga.imgAdditional_1}`)) {
          fs.unlink(`../server/${manga.imgAdditional_1}`, (err) => {
            if (err) console.warn(err);
          });
        }
        if (fs.existsSync(`../server/${manga.imgAdditional_2}`)) {
          fs.unlink(`../server/${manga.imgAdditional_2}`, (err) => {
            if (err) console.warn(err);
          });
        }
        if (fs.existsSync(`../server/${manga.imgAdditional_3}`)) {
          fs.unlink(`../server/${manga.imgAdditional_3}`, (err) => {
            if (err) console.warn(err);
          });
        }
      }
    }
    await MangaModel.findByIdAndRemove(mangaID);
    res.status(204);
  } catch (err) {
    console.warn(err);
    res.status(500).json({
      message: "Cannot find manga",
    });
  }
};

export const getAllManga = async (req: any, res: any) => {
  try {
    const manga = await MangaModel.find()
      .populate("categoriesArray")
      .populate("author")
      .populate("status")
      .sort({ $natural: -1 })
      .exec();
    res.json(manga);
  } catch (err) {
    console.warn(err);
    res.status(500).json({
      message: "Cannot recieve manga",
    });
  }
};

export const getOneManga = async (req: any, res: any) => {
  try {
    const mangaID = req.params.id;
    const manga = await MangaModel.findOneAndUpdate(
      {
        _id: mangaID,
      },
      { $inc: { viewsCount: 1 } }
    )
      .populate("categoriesArray")
      .populate("author")
      .populate("status")
      .exec();
    res.json(manga);
  } catch (err) {
    console.warn(err);
    res.status(500).json({
      message: "Cannot recieve manga",
    });
  }
};

export const getRecentManga = async (req: any, res: any) => {
  try {
    const manga = await MangaModel.find()
      .limit(3)
      .sort({ $natural: -1 })
      .exec();
    res.json(manga);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Cannot recieve manga",
    });
  }
};

export const getPopularManga = async (req: any, res: any) => {
  try {
    const manga = await MangaModel.find()
      .populate("categoriesArray")
      .sort({ viewsCount: -1 })
      .exec();
    res.json(manga);
  } catch (err) {
    console.warn(err);
    res.status(500).json({
      message: "Cannot recieve manga",
    });
  }
};
