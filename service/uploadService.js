const cloudinary = require('../config/cloudinary');

const uploadService = {};

uploadService.upload = async path => {
    const {secure_url} = await cloudinary.uploader.upload(path)
    return secure_url;
};

uploadService.uploadVideo = async path => {
    const {secure_url} = await cloudinary.uploader.upload(path,{resource_type: "video"})
    return secure_url;
}

module.exports = uploadService;