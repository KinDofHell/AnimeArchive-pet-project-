import MangaModel from "../model/Manga.js";
import fs from "fs";
export const createManga = async (req, res) => {
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
            images: req.body.images,
        });
        const manga = await document.save();
        res.json(manga);
    }
    catch (err) {
        console.warn(err);
        res.status(500).json({
            message: "Creating manga failed",
        });
    }
};
export const updateManga = async (req, res) => {
    try {
        const mangaID = req.params.id;
        await MangaModel.updateOne({
            _id: mangaID,
        }, {
            title: req.body.title,
            originTitle: req.body.originTitle,
            description: req.body.description,
            categoriesArray: req.body.categoriesArray,
            chapters: req.body.chapters,
            years: req.body.years.split(","),
            status: req.body.status,
            author: req.body.author,
            images: req.body.images,
        });
        res.json({
            success: true,
        });
    }
    catch (err) {
        console.warn(err);
        res.status(500).json({
            message: "Cannot update manga",
        });
    }
};
export const removeManga = async (req, res) => {
    try {
        const mangaID = req.params.id;
        const manga = await MangaModel.findById(mangaID);
        if (manga) {
            if (manga.images) {
                for (let i = 0; i < manga.images.length; i++) {
                    if (fs.existsSync(`../server${manga.images[i]}`)) {
                        fs.unlink(`../server${manga.images[i]}`, (err) => {
                            if (err)
                                console.warn(err);
                        });
                    }
                }
            }
        }
        await MangaModel.findByIdAndRemove(mangaID);
        res.status(204).json({
            success: true,
        });
    }
    catch (err) {
        console.warn(err);
        res.status(500).json({
            message: "Cannot find manga",
        });
    }
};
export const getAllManga = async (req, res) => {
    try {
        const manga = await MangaModel.find()
            .populate("categoriesArray")
            .populate("status")
            .sort({ $natural: -1 })
            .exec();
        res.json(manga);
    }
    catch (err) {
        console.warn(err);
        res.status(500).json({
            message: "Cannot receive manga",
        });
    }
};
export const getOneManga = async (req, res) => {
    try {
        const mangaID = req.params.id;
        const manga = await MangaModel.findOneAndUpdate({
            _id: mangaID,
        }, { $inc: { viewsCount: 1 } })
            .populate("categoriesArray")
            .populate("author")
            .populate("status")
            .populate("characters")
            .exec();
        res.json(manga);
    }
    catch (err) {
        console.warn(err);
        res.status(500).json({
            message: "Cannot receive manga",
        });
    }
};
export const getRecentManga = async (req, res) => {
    try {
        const manga = await MangaModel.find()
            .limit(3)
            .sort({ $natural: -1 })
            .exec();
        res.json(manga);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Cannot receive manga",
        });
    }
};
export const getPopularManga = async (req, res) => {
    try {
        const manga = await MangaModel.find()
            .populate("categoriesArray")
            .sort({ viewsCount: -1 })
            .exec();
        res.json(manga);
    }
    catch (err) {
        console.warn(err);
        res.status(500).json({
            message: "Cannot receive manga",
        });
    }
};
//# sourceMappingURL=MangaContrlr.js.map