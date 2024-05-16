import multer from "multer";

const storage = multer.memoryStorage();

export const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
      if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "image/gif"
      ) {
        cb(null, true);
      } else {
        cb(new Error("Invalid file type"));
      }
    },
  });
