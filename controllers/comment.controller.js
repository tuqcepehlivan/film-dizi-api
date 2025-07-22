
const { Comment } = require("../models");
//const { getById } = require("./video.controller");

module.exports = {
    getByVideoId: async (req, res) => {
        try {
            const comments = await Comment.findAll({
                where: { videoId: req.params.videoId }
            });
            res.json(comments);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    create: async (req, res) => {
        try {
            const { content, videoId } = req.body;
            const comment = await Comment.create({
                content,
                videoId,
                userId: req.user.id 
            });
            res.status(201).json(comment);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    update: async (req, res) => {
        const comment = await Comment.findByPk(req.params.id);
        if (!comment || comment.userId !== req.user.id)
            return res.status(403).json({ error: "İzin yok" });

        await comment.update({ content: req.body.content });
        res.json(comment);
    },

    remove: async (req, res) => {
        const comment = await Comment.findByPk(req.params.id);
        if (!comment || comment.userId !== req.user.id)
            return res.status(403).json({ error: "İzin yok"});
        
        await comment.destroy();
        res.json({ message: "Yorum silindi" });
    }
};