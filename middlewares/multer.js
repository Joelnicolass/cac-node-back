const multer = require("multer");
const path = require("path");

export const fileStorage = multer.diskStorage({
  destination: (req, file, next) => {
    next(null, path.join(__dirname, "../../uploads"));
  },

  filename: (req, file, next) => {
    next(null, Date.now() + "-" + file.originalname);
  },
});

export const fileFilter = (req, file, next) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    next(null, true);
  } else {
    next(null, false);
  }
};
