import AnimeModel from "../model/Anime.js";
import MangaModel from "../model/Manga.js";
import NewsModel from "../model/News.js";
import CharacterModel from "../model/Character.js";
import UserModel from "../model/User.js";
export const getNumberOfEntities = async (req, res) => {
    try {
        const num_anime = await AnimeModel.find();
        const num_manga = await MangaModel.find();
        const num_characters = await CharacterModel.find();
        const num_news = await NewsModel.find();
        const num_users = await UserModel.find();
        const moderators = await UserModel.find({
            $nor: [
                { role: "642c6ba083145c6516e56f9e" },
                { role: "642c6c31cfc433e920667102" },
            ],
        });
        const numbers = {
            anime: num_anime.length,
            manga: num_manga.length,
            news: num_news.length,
            characters: num_characters.length,
            users: num_users.length,
            moderators: moderators,
        };
        res.json(numbers);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Error getting admin info",
        });
    }
};
//# sourceMappingURL=AdminInfoContrlr.js.map