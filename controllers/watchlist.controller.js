
const { where } = require("sequelize");
const { WatchList, Video } = require("../models");
const { remove } = require("./video.controller");


module.exports = {
    add: async (req, res) => {
        try {
            const { videoId } = req.body;

            const [entry, created] = await WatchList.findOrCreate({
                where: { userId: req.user.id, videoId }
            });

            if (!created) {
                return res.status(400).json({ message: "Zaten listede var" });
            }

            res.status(201).json(entry);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    remove: async (req, res) => {
        try {
            const { videoId } = req.body;

            const deleted = await WatchList.destroy({
                where: { userId: req.user.id, videoId }
            });

            if (!deleted) {
                return res.status(404).json({ message: "kayıt bulunamadı"});
            }

            res.json({ message: "İzleme listesinden çıkarıldı" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
},


    getMyList: async (req, res) => {
        try {
            const list = await WatchList.findAll({
                where: { userId: req.user.id },
                include: [{ model: Video }]
            });

            res.json(list);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};