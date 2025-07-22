
const { error } = require("console");
const { Video } = require("../models");
const path = require("path");


module.exports = {
    getAll: async (req, res) => {
        const videos = await Video.findAll();
        res.json(videos);
    },

    getById: async (req, res) => {
        const video = await Video.findByPk(req.params.id);
        if (!video) return res.status(404).json({ error: "Video bulunamadı" });
        res.json(video);
    },

    create: async (req, res) => {
        try {
            if (req.user.role !== "admin") {
                return res.status(403).json({ error: "Yalnızca admin video ekleyebilir" });
            }

            const thumbnail = req.files.thumbnail?.[0];
            const videoFile = req.files.video?.[0];

            if (!thumbnail || !videoFile) {
                return res.status(400).json({ error: "Hem video hem thumbnail yüklenmeli" });
            }

            const newVideo = await Video.create({
                ...req.body,
                thumbnail_path: "/uploads/${thumbnail.filename}",
                video_path:"/uploads/${videoFile.filename}",
                userId: req.user.id 
            });

            res.status(201).json(newVideo);
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    },

    update: async (req, res) => {
        const video = await Video.findByPk(req.params.id);
        if (!video) return res.status(404).json({ error: "Video bulunamadı" });

        await video.update(req.body);
        res.json(video);
    },

    remove: async (req, res) => {
        const video = await Video.findByPk(req.params.id);
        if (!video) return res.status(404).json({ error: "Video bulunamadı" });

        await video.destroy();
        res.json({ message: "Video silindi" });
    }
};