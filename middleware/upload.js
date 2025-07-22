
const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },

    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const name = Date.now() + ext;
        cb(null, name);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|mp4|mov|avi|webm/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());

    if (extname) cb(null, true);
    else cb(new Error("Sadece resim vey video dosyları yüklenebilir"));
};

const upload = multer({ 
    storage,
    fileFilter,
    limits: { fileSize: 100*1024*1024} 
});

module.exports = upload;