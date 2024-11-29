const multer = require('multer');
const uuid = require('uuid');

const imageID = uuid.v4();

const multerStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, `${__dirname}/../../web/public/uploads`);
    }, filename: (req, file, callback) => {
        const type = file.mimetype.split('/')[1];
        callback(null, `image-${imageID}-${Date.now()}.${type}`);
    }
});

const multerFilter = (req, file, callback) => {
    if (file.mimetype.startsWith('image')) {
        callback(null, true)
    } else {
        callback(new Error('File is not supported'), false);
    }
};

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});

const uploadImage = upload.single('image');

module.exports = {
    uploadImage
}