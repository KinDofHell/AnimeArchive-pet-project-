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
      if (news.images) {
        for (let i = 0; i < news.images.length; i++) {
          if (fs.existsSync(`../server${news.images[i]}`)) {
            fs.unlink(`../server${news.images[i]}`, (err) => {
              if (err) console.warn(err);
            });
          }
        }
      }
    }
    await NewsModel.findByIdAndRemove(newsID);
    res.status(204).json({
      success: true,
    });
  } catch (err) {
    console.warn(err);
    res.status(500).json({
      message: "Cannot find news",
    });
  }
};

export const getAllNews = async (req: any, res: any) => {
  try {
    const news = await NewsModel.find().sort({ $natural: -1 }).exec();
    res.json(news);
  } catch (err) {
    console.warn(err);
    res.status(500).json({
      message: "Cannot receive news",
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
      .populate("linkedCharacters")
      .exec();
    res.json(news);
  } catch (err) {
    console.warn(err);
    res.status(500).json({
      message: "Cannot receive news",
    });
  }
};

export const getRecentNews = async (req: any, res: any) => {
  try {
    const news = await NewsModel.find().limit(2).sort({ $natural: -1 }).exec();
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
    const news = await NewsModel.find().sort({ viewsCount: -1 }).exec();
    res.json(news);
  } catch (err) {
    console.warn(err);
    res.status(500).json({
      message: "Cannot recieve news",
    });
  }
};
