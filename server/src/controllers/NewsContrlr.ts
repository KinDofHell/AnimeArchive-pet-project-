import NewsModel from "../model/News.js";

import fs from "fs";

export const createNews = async (req: any, res: any) => {
  try {
    const document = new NewsModel(req.body);

    const news = await document.save();
    res.json(news);
  } catch (err) {
    console.warn(err);
    res.status(500).json({
      message: "Creating news failed",
    });
  }
};

export const updateNews = async (req: any, res: any) => {
  try {
    const newsID = req.params.id;
    await NewsModel.updateOne(
      {
        _id: newsID,
      },
      req.body
    );

    res.json({
      success: true,
    });
  } catch (err) {
    console.warn(err);
    res.status(500).json({
      message: "Cannot update news",
    });
  }
};

export const removeNews = async (req: any, res: any) => {
  try {
    const newsID = req.params.id;
    const news = await NewsModel.findById(newsID);
    if (news) {
      if (fs.existsSync(`../server/${news.imgUrl_1}`)) {
        fs.unlink(`../server/${news.imgUrl_1}`, (err) => {
          if (err) console.warn(err);
        });
      }
      if (fs.existsSync(`../server/${news.imgUrl_2}`)) {
        fs.unlink(`../server/${news.imgUrl_2}`, (err) => {
          if (err) console.warn(err);
        });
      }
      if (fs.existsSync(`../server/${news.imgUrl_3}`)) {
        fs.unlink(`../server/${news.imgUrl_3}`, (err) => {
          if (err) console.warn(err);
        });
      }
    }
    await NewsModel.findByIdAndRemove(newsID);
    res.status(204);
  } catch (err) {
    console.warn(err);
    res.status(500).json({
      message: "Cannot find news",
    });
  }
};

export const getAllNews = async (req: any, res: any) => {
  try {
    const news = await NewsModel.find()
      .populate("linkedAnime")
      .populate("linkedManga")
      //   .populate("linkedCharacters")
      .sort({ $natural: -1 })
      .exec();
    res.json(news);
  } catch (err) {
    console.warn(err);
    res.status(500).json({
      message: "Cannot recieve news",
    });
  }
};

export const getOneNews = async (req: any, res: any) => {
  try {
    const newsID = req.params.id;
    const news = await NewsModel.findOneAndUpdate(
      {
        _id: newsID,
      },
      { $inc: { viewsCount: 1 } }
    )
      .populate("linkedAnime")
      .populate("linkedManga")
      //   .populate("linkedCharacters")
      .exec();
    res.json(news);
  } catch (err) {
    console.warn(err);
    res.status(500).json({
      message: "Cannot recieve news",
    });
  }
};

export const getRecentNews = async (req: any, res: any) => {
  try {
    const news = await NewsModel.find().limit(3).sort({ $natural: -1 }).exec();
    res.json(news);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Cannot recieve news",
    });
  }
};

export const getPopularNews = async (req: any, res: any) => {
  try {
    const news = await NewsModel.find()
      .populate("linkedAnime")
      .populate("linkedManga")
      //   .populate("linkedCharacters")
      .sort({ viewsCount: -1 })
      .exec();
    res.json(news);
  } catch (err) {
    console.warn(err);
    res.status(500).json({
      message: "Cannot recieve news",
    });
  }
};
