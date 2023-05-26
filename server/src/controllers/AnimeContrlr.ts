import AnimeModel from "../model/Anime.js";

import fs from "fs";
import { Query } from "mongoose";

export const createAnime = async (req: any, res: any) => {
  try {
    const document = new AnimeModel({
      title: req.body.title,
      originTitle: req.body.originTitle,
      description: req.body.description,
      categoriesArray: req.body.categoriesArray,
      seasons: req.body.seasons,
      series: req.body.series,
      years: req.body.years.split(","),
      status: req.body.status,
      author: req.body.author,
      characters: req.body.characters,
      images: req.body.images,
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
        originTitle: req.body.originTitle,
        description: req.body.description,
        categoriesArray: req.body.categoriesArray,
        seasons: req.body.seasons,
        series: req.body.series,
        years: req.body.years.split(","),
        status: req.body.status,
        author: req.body.author,
        characters: req.body.characters,
        images: req.body.images,
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
      if (anime.images) {
        for (let i = 0; i < anime.images.length; i++) {
          if (fs.existsSync(`../server/${anime.images[i]}`)) {
            fs.unlink(`../server${anime.images[i]}`, (err) => {
              if (err) console.warn(err);
            });
          }
        }
      }
    }
    await AnimeModel.findByIdAndRemove(animeID);
    res.status(204).json({
      success: true,
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
    const anime = await AnimeModel.find()
      .populate("categoriesArray")
      .populate("status")
      .sort({ $natural: -1 })
      .exec();
    res.json(anime);
  } catch (err) {
    console.warn(err);
    res.status(500).json({
      message: "Cannot receive anime",
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
      { $inc: { viewsCount: 1 } }
    )
      .populate("categoriesArray")
      .populate("author")
      .populate("status")
      .populate("characters")
      .exec();
    res.json(anime);
  } catch (err) {
    console.warn(err);
    res.status(500).json({
      message: "Cannot receive anime",
    });
  }
};

export const getRecentAnime = async (req: any, res: any) => {
  try {
    const anime = await AnimeModel.find()
      .limit(3)
      .sort({ $natural: -1 })
      .exec();
    res.json(anime);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Cannot receive anime",
    });
  }
};

export const getPopularAnime = async (req: any, res: any) => {
  try {
    const anime = await AnimeModel.find()
      .populate("status")
      .sort({ viewsCount: -1 })
      .exec();
    res.json(anime);
  } catch (err) {
    console.warn(err);
    res.status(500).json({
      message: "Cannot receive anime",
    });
  }
};
