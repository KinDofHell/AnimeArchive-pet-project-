import AnimeModel from "../model/Anime.js";
import MangaModel from "../model/Manga.js";
import NewsModel from "../model/News.js";
import CharacterModel from "../model/Character.js";
import UserModel from "../model/User.js";
export const getNumberOfEntities = async (req, res) => {
    try {
        const today = new Date();
        today.setUTCHours(0, 0, 0, 0);
        const getAggregateCreatedToday = async (model) => {
            const countDocsCreatedToday = await model.aggregate([
                {
                    $match: {
                        createdAt: {
                            $gte: today,
                        },
                    },
                },
                {
                    $group: {
                        _id: null,
                        count: { $sum: 1 },
                    },
                },
            ]);
            if (!countDocsCreatedToday[0])
                return 0;
            else
                return countDocsCreatedToday[0].count;
        };
        const getAggregate = async (model) => {
            const count = await model.aggregate([
                {
                    $group: {
                        _id: null,
                        count: { $sum: 1 },
                    },
                },
            ]);
            return count[0].count;
        };
        const moderators = await UserModel.find({
            $nor: [
                { role: "642c6ba083145c6516e56f9e" },
                { role: "642c6c31cfc433e920667102" },
            ],
        }).populate("role");
        const numbers = await Promise.all([
            getAggregate(AnimeModel),
            getAggregateCreatedToday(AnimeModel),
            getAggregate(MangaModel),
            getAggregateCreatedToday(MangaModel),
            getAggregate(NewsModel),
            getAggregateCreatedToday(NewsModel),
            getAggregate(CharacterModel),
            getAggregateCreatedToday(CharacterModel),
            getAggregate(UserModel),
            getAggregateCreatedToday(UserModel),
        ]);
        const [anime, animeToday, manga, mangaToday, news, newsToday, characters, charactersToday, users, userToday,] = numbers;
        const result = {
            anime,
            animeToday,
            manga,
            mangaToday,
            news,
            newsToday,
            characters,
            charactersToday,
            users,
            userToday,
            moderators: moderators,
        };
        res.json(result);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Error getting admin info",
        });
    }
};
//# sourceMappingURL=AdminInfoContrlr.js.map