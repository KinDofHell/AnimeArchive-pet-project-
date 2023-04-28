import UserWatching from "../model/UserWatching.js";
export const toggleStatusAnime = async (req, res) => {
    const user = await UserWatching.findById(req.params.userID);
    try {
        if (!user) {
            const document = new UserWatching({
                user: req.params.userID,
                animeArray: { $push: req.animeArray },
            });
            const userWaching = await document.save();
            res.json(userWaching);
        }
        else {
            if (user.animeArray.includes(req.animeArray)) {
                user.animeArray.forEach((anime) => {
                    if (anime.title === req.animeArray.title) {
                        anime.status = req.animeArray.status;
                    }
                });
                UserWatching.updateOne({
                    user: req.params.userID,
                }, { $set: { animeArray: user.animeArray } });
            }
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Toggle status failed",
        });
    }
};
//# sourceMappingURL=UserWatchingContrlr.js.map