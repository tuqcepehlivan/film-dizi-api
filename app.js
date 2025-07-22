
require("dotenv").config();

const express = require("express");
const app = express();
const { sequelize } = require("./models");

const userRoutes = require("./routes/user.routes");
const videoRoutes = require("./routes/video.routes");
const commentRoutes = require("./routes/comment.routes");
const favoriteRoutes = require("./routes/favorite.routes");
const watchlistRoutes = require("./routes/watchlist.routes");
const ratingRoutes = require("./routes/rating.routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);

app.use("/api/videos", videoRoutes);
app.use("/uploads", express.static("uploads"));

app.use("/api/comments", commentRoutes);

app.use("/api/favorites", favoriteRoutes);

app.use("/api/ratings", ratingRoutes);

app.use("/api/watchlist", watchlistRoutes);

app.get("/", (req, res) => {
    res.send("Film-dizi API çalışıyor!");
});

sequelize.authenticate()
 .then(() => console.log("PostreSQL bağlantısı başarılı "))
 .catch(err => console.error("Bağlantı hatası:", err));

module.exports = app;

