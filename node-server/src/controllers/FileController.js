// controllers/FileController.js
const multer = require("multer");
const path = require('path');
const fs = require('fs');

const uploadDir = path.join(__dirname, '../../uploads');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Ensure that the destination directory exists
        fs.mkdir(uploadDir, { recursive: true }, (err) => {
            if (err) {
                console.error("Error creating upload directory:", err);
            }
            cb(null, uploadDir);
        });
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); 
    }
});

const upload = multer({ storage: storage });

function handleFileUpload(req, res) {
    upload.single('file')(req, res, function (err) {
        if (err) {
            if (err instanceof multer.MulterError) {
                return res.status(400).json({ message: 'File upload error: ' + err.message });
            } else {
                console.error(err);
                return res.status(500).json({ message: 'Internal server error' });
            }
        }
        const fileInfo = req.file;
        if (!fileInfo) {
            return res.status(400).json({ message: 'Aucun fichier n\'a été téléchargé' });
        }
        const fileName = fileInfo.originalname;
        const fileSize = fileInfo.size;
        const fileType = fileInfo.mimetype;

        res.json({ 
            message: 'Fichier téléchargé avec succès', 
            fileName: fileName, 
            fileSize: fileSize, 
            fileType: fileType 
        });
    });
}

module.exports = {
    handleFileUpload
};
