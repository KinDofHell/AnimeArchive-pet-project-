import CharacterModel from "../model/Character.js";
import fs from "fs";
export const createCharacter = async (req, res) => {
    try {
        const document = new CharacterModel(req.body);
        const character = await document.save();
        res.json(character);
    }
    catch (err) {
        console.warn(err);
        res.status(500).json({
            message: "Creating character failed",
        });
    }
};
export const updateCharacter = async (req, res) => {
    try {
        const characterID = req.params.id;
        await CharacterModel.updateOne({
            _id: characterID,
        }, req.body);
        res.json({
            success: true,
        });
    }
    catch (err) {
        console.warn(err);
        res.status(500).json({
            message: "Cannot update character",
        });
    }
};
export const removeCharacter = async (req, res) => {
    try {
        const characterID = req.params.id;
        const character = await CharacterModel.findById(characterID);
        if (character) {
            if (character.images) {
                for (let i = 0; i < character.images.length; i++) {
                    if (fs.existsSync(`../server${character.images[i]}`)) {
                        fs.unlink(`../server${character.images[i]}`, (err) => {
                            if (err)
                                console.warn(err);
                        });
                    }
                }
            }
        }
        await CharacterModel.findByIdAndRemove(characterID);
        res.status(204).json({
            success: true,
        });
    }
    catch (err) {
        console.warn(err);
        res.status(500).json({
            message: "Cannot find character",
        });
    }
};
export const getAllCharacter = async (req, res) => {
    try {
        const character = await CharacterModel.find().sort({ $natural: -1 }).exec();
        res.json(character);
    }
    catch (err) {
        console.warn(err);
        res.status(500).json({
            message: "Cannot receive character",
        });
    }
};
export const getOneCharacter = async (req, res) => {
    try {
        const characterID = req.params.id;
        const character = await CharacterModel.findOneAndUpdate({
            _id: characterID,
        }, { $inc: { viewsCount: 1 } })
            .populate("partnersArray")
            .exec();
        res.json(character);
    }
    catch (err) {
        console.warn(err);
        res.status(500).json({
            message: "Cannot receive character",
        });
    }
};
export const getPopularCharacter = async (req, res) => {
    try {
        const character = await CharacterModel.find()
            .sort({ viewsCount: -1 })
            .limit(1)
            .exec();
        res.json(character);
    }
    catch (err) {
        console.warn(err);
        res.status(500).json({
            message: "Cannot receive character",
        });
    }
};
export const getPopularCharacters = async (req, res) => {
    try {
        const character = await CharacterModel.find()
            .sort({ viewsCount: -1 })
            .exec();
        res.json(character);
    }
    catch (err) {
        console.warn(err);
        res.status(500).json({
            message: "Cannot receive characters",
        });
    }
};
//# sourceMappingURL=CharacterContrlr.js.map