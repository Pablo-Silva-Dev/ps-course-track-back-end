import multer from "multer";
import path from "path";
import { uuid as uuidV4 } from "uuidv4";

const tempFolder = path.resolve(__dirname, "..", "temp_uploads");

const multerConfig = multer.diskStorage({
  destination: tempFolder,
  filename: (_, file, callback) => {
    const fileName = `${uuidV4()}-${file.originalname}`;
    return callback(null, fileName);
  },
});

export { multerConfig, tempFolder };
