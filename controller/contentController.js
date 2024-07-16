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
  console.log("--------------",req.admin.id)
  console.log("--------------",req.body)
  const data = {
    admin_id: req.admin.id,
    title: req.body.title[0],
    description: req.body.description[0],
    catagorie_id: 3,
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

//!create 

// get content
const getContentByCatagoryId = tryCatch(async (req, res, next) => {
  const { id } = req.params;
  console.log(req.params, "******************");
  if (!id) {
    return res.status(400).json({ message: "Missing category name" });
  }
  const data = {
    catagorie_id: +id,
  };

 const content =  await prisma.postContent.findMany({
    where: data,
  });
if(!content){
  createError({
    message: "missing content",
    statusCode: 400,
  });
}

  res.json( content );
});

//! get all content
const getAllContent = tryCatch(async (req, res, next) => {

  const result = await prisma.postContent.findMany();

  res.json({result});
});

//! getContentById
const getContentById = tryCatch(async (req, res, next) => {
  const id = +req.params.id;
  console.log(req.params);

  if (!id) {
    return res.status(400).json({ message: "Missing content" });
  }
  const result = await prisma.postContent.findUnique({ where: { id } });
  
  res.json({result});
});

//! update admin
const updateContent = tryCatch(async (req, res, next) => {
  res.json({ msg: "update content" });
});

// delete content
const deleteContent = tryCatch(async (req, res, next) => {
  const id = +req.params.id;
  console.log(req.params);

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
  getContentById,
  getAllContent
};
