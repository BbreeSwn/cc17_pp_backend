const tryCatch = require("../utils/tryCatch");
const prisma = require("../models");
const createError = require("../utils/createError");

//! get all content
const getAllContent = tryCatch(async (req, res, next) => {
  const result = await prisma.postContent.findMany({
    where: { catagorie_id: 3 },
  });
  res.status(200).json({ result });
});

const getAllKidsProgramContent = tryCatch(async (req, res, next) => {
  const result = await prisma.postContent.findMany({
    where: { catagorie_id: 4 },
  });
  res.status(200).json({ result });
});

//! getContentById
const getContentById = tryCatch(async (req, res, next) => {
  const id = +req.params.id;
  console.log(req.params);

  if (!id) {
    return res.status(400).json({ message: "Missing content" });
  }
  const result = await prisma.postContent.findUnique({ where: { id } });
  res.json({ result });
});

//! getContentById
const getKidsProgramById = tryCatch(async (req, res, next) => {
  const id = +req.params.id;
  console.log(req.params);

  if (!id) {
    return res.status(400).json({ message: "Missing content" });
  }
  const result = await prisma.postContent.findUnique({ where: { id } });
  res.json({ result });
});

//! getNewsContentById
const getNewsContentById = tryCatch(async (req, res, next) => {
  const id = +req.params.id;
  console.log(req.params);

  if (!id) {
    return res.status(400).json({ message: "Missing content" });
  }
  const result = await prisma.postContent.findUnique({ where: { id } });
  res.json({ result });
});



// updateStory
const updateStory = tryCatch(async (req, res, next) => {
  const id = +req.params.id


  const { messageText } = req.body;

  if (!messageText) {
    createError({
      message: "message or image is required",
      statusCode: 400,
    });
  }
  const data = {
    messageText,

  };
  console.log(data);
  const result = await prisma.postContent.update({
    where: { id },
    data,
  });

  res.status(200).json({ result });
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
    catagory_name: req.body.name,
    admin_id: req.admin.id,
    title: req.body.title[0],
    description: req.body.description[0],
  };
  if (file) {
    data.cover_image = await uploadService.upload(req.file.path);
  }
  // console.log(data);
  await prisma.catagories.create({
    data,
  });
});

module.exports = {
  getAllContent,
  getContentById,
  updateStory,
  createCatagory,
  getAllKidsProgramContent,
  getKidsProgramById,
  getNewsContentById
}; // เพิ่ม updateStory ใน module.exports
