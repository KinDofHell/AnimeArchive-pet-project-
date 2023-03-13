import AnimeModel from "../model/Anime.js";

import fs from "fs";

export const createAnime = async (req: any, res: any) => {
  try {
    const document = new AnimeModel({
      title: req.body.title,
      description: req.body.description,
      categories: req.body.categories,
      seasons: req.body.seasons,
      series: req.body.series,
      years: req.body.years.split(","),
      status: req.body.status,
      author: req.body.author,
      imgCover: req.body.imgCover,
      imgAdditional_1: req.body.imgAdditional_1,
      imgAdditional_2: req.body.imgAdditional_2,
      imgAdditional_3: req.body.imgAdditional_3,
    });

    const anime = await document.save();
    res.json(anime);
  } catch (err) {
    console.warn(err);
    res.status(500).json({
      message: "Creating anime failed",
    });
  }
};

export const updateAnime = async (req: any, res: any) => {
  try {
    const animeID = req.params.id;
    await AnimeModel.updateOne(
      {
        _id: animeID,
      },
      {
        title: req.body.title,
        description: req.body.description,
        categories: req.body.categories,
        seasons: req.body.seasons,
        series: req.body.series,
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
      message: "Cannot update anime",
    });
  }
};

export const removeAnime = async (req: any, res: any) => {
  try {
    const animeID = req.params.id;
    const anime = await AnimeModel.findById(animeID);
    if (anime) {
      if (anime.imgCover) {
        if (fs.existsSync(`../server/${anime.imgCover}`)) {
          fs.unlink(`../server/${anime.imgCover}`, (err) => {
            if (err) console.warn(err);
          });
        }
        if (fs.existsSync(`../server/${anime.imgAdditional_1}`)) {
          fs.unlink(`../server/${anime.imgAdditional_1}`, (err) => {
            if (err) console.warn(err);
          });
        }
        if (fs.existsSync(`../server/${anime.imgAdditional_2}`)) {
          fs.unlink(`../server/${anime.imgAdditional_2}`, (err) => {
            if (err) console.warn(err);
          });
        }
        if (fs.existsSync(`../server/${anime.imgAdditional_3}`)) {
          fs.unlink(`../server/${anime.imgAdditional_3}`, (err) => {
            if (err) console.warn(err);
          });
        }
      }
    }
    const result = await AnimeModel.findByIdAndRemove(animeID);
    res.json({
      success: result,
    });
  } catch (err) {
    console.warn(err);
    res.status(500).json({
      message: "Cannot find anime",
    });
  }
};

export const getAllAnime = async (req: any, res: any) => {
  try {
    const anime = await AnimeModel.find().populate("categories").exec();
    res.json(anime);
  } catch (err) {
    console.warn(err);
    res.status(500).json({
      message: "Cannot recieve anime",
    });
  }
};

export const getOneAnime = async (req: any, res: any) => {
  try {
    const animeID = req.params.id;
    const anime = await AnimeModel.findOneAndUpdate(
      {
        _id: animeID,
      },
      { $inc: { viewsCount: 1 } },
      { returnDocuments: "after" }
    )
      .populate("categories")
      .exec();
    res.json(anime);
  } catch (err) {
    console.warn(err);
    res.status(500).json({
      message: "Cannot recieve anime",
    });
  }
};

export const getRecentAnime = async (req: any, res: any) => {
  try {
    const anime = await AnimeModel.find().limit(3).exec();
    res.json(anime);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Cannot recieve anime",
    });
  }
};
