
const { Rating } = require("../models");
const { Sequelize } = require("sequelize");
const { remove } = require("./video.controller");

module.exports = {
    rateOrUpdate: async (req, res) => {
        try {
            const { videoId, score } = req.body;

            if (score < 1 || score > 5) {
                return res.status(400).json({ error: "Puan 1 ile 5 arasında olmalı"});
            }
            const [rating, created] = await Rating.upsert({
                userId: req.user.id,
                videoId,
                score  }, {
                    returning: true,
                    conflictFields: ["userId", "videoId"]
                

            });

            res.status(created ? 201 : 200).json(rating);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    remove: async (req, res) => {
        try {
            const { videoId } = req.body;

            const deleted = await Rating.destroy({
                where: { userId: req.user.id, videoId }
            });

            if (!deleted) {
                return res.status(404).json({ error: "Puan bulunamadı"});
            }

            res.json({ message: "Puan silindi"});
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },


    getVideoAvarage: async (req, res) => {
        try {
            const videoId = req.params.videoId;

            const result = await Rating.findOne({
                attributes: [[Sequelize.fn("AVG", Sequelize.col("score")), "avg_rating"]],
                where: { videoId: videoId },
                raw: true
            });

            res.json({ average: parseFloat(result.avg_rating || 0).toFixed(2) });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};