const express = require('express');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');
const { uploadFile, deleteFile } = require('../controllers/uploadController');

const router = express.Router();

router.use(protect);

router.post('/', upload.single('file'), uploadFile);
router.delete('/:publicId', deleteFile);

module.exports = router;
