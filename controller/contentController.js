const tryCatch = require("../utils/tryCatch");
const prisma = require("../models");
const uploadService = require("../service/uploadService");
const createError = require("../utils/createError");

//create content
const createContent = tryCatch(async (req, res, next) => {
  // console.log('************************************',req.body);
  // console.log(req.file);

  if (!req.file && !req.body.title && !req.body.description) {
    createError({
      message: "message or image is required",
      statusCode: 400,
    });
  }
  const data = {
    admin_id: req.admin.id,
    title: req.body.title,
    description: req.body.description,
    catagorie_id : +req.body.catagory_id
  };
  console.log("***************************", data);
  if (req.file) {
    data.cover_image = await uploadService.upload(req.file.path);
  }
  console.log(data);
  await prisma.postContent.create({
    data,
  });

  res.json({ msg: "create content successfuly" });
});

// creat catagory
const createCatagory = tryCatch(async (req, res, next) => {

  if (!req.body.catagory_name && !req.file) {
    createError({
      message: "message or image is required",
      statusCode: 400,
    });
  }
  const data = {
    catagory_name,
  };
  if (file) {
    data.cover_image = await uploadService.upload(req.file.path);
  }
  // console.log(data);
  await prisma.catagories.create({
    data,
  });
});

// get content
const getContentByCatagoryId = tryCatch(async (req, res, next) => {
  const { catagory_name } = req.body;
  const file = req.file;
  if (!catagory_name) {
    return res.status(400).json({ message: "Missing category name" });
  }
  const data = {
    catagory_name,
  };
  if (file) {
    data.image = await uploadService.upload(file.path); // Assuming uploadService handles file upload
  }
  await prisma.catagories.create({ data });

  res.json({ msg: "get content" });
});

// update admin
const updateContent = tryCatch(async (req, res, next) => {
  res.json({ msg: "update content" });
});


// delete content
const deleteContent = tryCatch(async (req, res, next) => {
  const id  = +req.params.id;
  console.log(req.params)

  if (!id) {
    return res.status(400).json({ message: "Missing content" });
  }
  await prisma.postContent.delete({ where: { id } });
  res.json({ msg: "Bye " });
});

module.exports = {
  createContent,
  updateContent,
  deleteContent,
  getContentByCatagoryId,
  createCatagory,
};
