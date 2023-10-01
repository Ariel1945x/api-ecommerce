
const catchError = require('../utils/catchError');
const Images = require('../models/Images');
const { uploadToCloudinary, deleteFromCloudinary } = require('../utils/cloudinary')

const getAll = catchError(async(req, res) => {
    const image = await Images.findAll();
    return res.json(image);
});

const create = catchError(async(req, res) => {
    const { path, filename } = req.file;
    const { url, public_id } = await uploadToCloudinary(path, filename);
    const image = await Images.create({ url, publicId: public_id });
    return res.status(201).json(image);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const image = await Images.findByPk(id)
    if (!image) return res.status(404).json({ error: 'Image not found' });
    await deleteFromCloudinary(image.publicId)
    await image.destroy()
    return res.sendStatus(204);
});

module.exports = {
    getAll,
    create,
    remove
}