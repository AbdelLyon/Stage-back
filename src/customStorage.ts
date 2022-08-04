import { diskStorage } from 'multer';

export const CustomStorage = diskStorage({
  // Specify where to save the file
  destination: (req, file, cb) => {
    cb(null, process.env.TEMP_FOLDER);
  },
  // Specify the file name
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
