
const { Favorite, Video } = require("../models");

module.exports = {
    add: async (req, res) => {
        try {
            const { videoId } = req.body;

            const [fav, created] = await Favorite.findOrCreate({
                where: { userId: req.user.id, videoId }
            });

            if (!created) {
                return res.status(400).json({ message: "Zaten favorilere eklenmiş "});
            }
            res.status(201).json(fav);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    remove: async (req, res) => {
        try {
            const { videoId } = req.body;

            const deleted = await Favorite.destroy({
                where: { user_id: req.user.id, videoId }
            });

            if (!deleted) {
                return res.status(404).json({ message: "Kayıt bulunamadı" });
            }

            res.json({ message: "Favorilerden çıkarıldı" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getMyFavorites: async (req, res) => {
        try {
            const favorites = await Favorite.findAll({
                where: { userId: req.user.id },
                include: [{ model: Video }]
            });

            res.json(favorites);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};