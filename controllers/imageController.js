// Import modeli
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const Gallery = require("../models/gallery");
const User = require("../models/user");
const Image = require('../models/image');
const Comment = require('../models/comment')


exports.image_add_get = asyncHandler(async (req, res, next) => {
  const currentUser = await User.findOne({ username: req.user.username }).exec();
  const userGalleries = await Gallery.find({ user: currentUser._id }).exec();
  res.render("image_form", {
    title: "Add image",
    galleries: userGalleries,
  });
  console.log("user: ",req.user._id)
});

exports.image_add_post = [
    // Validations and sanitizations
    body("i_name")
      .trim()
      .isLength({ min: 2 })
      .escape()
      .withMessage("Image name too short."),
    body("i_description")
      .trim()
      .isLength({ min: 2 })
      .escape()
      .withMessage("Description too short."),
    body("i_path")
      .trim()
      .isLength({ min: 3 })
      .escape()
      .withMessage("File path too short."),
    body("i_gallery")
      .trim()
      .notEmpty()
      .withMessage("Gallery must be selected."),
  
    // Async handler for the request
    asyncHandler(async (req, res, next) => {
      console.log("Form data:", req.body);
  
      // Extract validation errors from a request
      const errors = validationResult(req);
  
      // Create a new image instance
      const image = new Image({
        name: req.body.i_name,
        description: req.body.i_description,
        path: req.body.i_path,
        gallery: req.body.i_gallery,
      });
  
      // Check for validation errors
      if (!errors.isEmpty()) {
        const galleries = await Gallery.find({ user: currentUser.user._id }).exec();
        res.render("image_form", {
          title: "Add Image",
          image: image,
          galleries: galleries,
          errors: errors.array(),
        });
      } else {
        // Check if the image already exists
        const imageExists = await Image.findOne({
          name: req.body.i_name,
          gallery: req.body.i_gallery,
        }).collation({ locale: "en", strength: 2 }).exec();
  
        if (imageExists) {
          res.send("Image already exists in this gallery");
        } else {
          // Save the new image
          await image.save();
          res.redirect("/images");
        }
      }
    }),
  ];

  exports.image_edit_get = asyncHandler(async (req, res, next) => {
    const image = await Image.findById(req.params.id).exec();
    if (!image) {
      return res.status(404).send("Image not found");
    }
    const currentUser = await User.findOne({ username: req.user.username }).exec();
    res.render("image_form", {
      title: "Edit Image",
      image: image,
      galleries: await Gallery.find({ user: currentUser._id }).exec()
    });
  });

  
  exports.image_edit_post = [
    body('i_name', 'Image name must contain at least 2 characters')
      .trim().isLength({ min: 2 }).escape(),
    body('i_description', 'Description must contain at least 2 characters')
      .trim().isLength({ min: 2 }).escape(),
    body('i_gallery', 'Gallery must be specified').trim().escape(),
  
    asyncHandler(async (req, res, next) => {
      const errors = validationResult(req);
      const image = new Image({
        _id: req.params.id,  // ID obrazka, który edytujemy
        name: req.body.i_name,
        description: req.body.i_description,
        gallery: req.body.i_gallery,
        path: req.body.i_path,  // Zakładam, że ścieżka obrazu nie zmienia się w edycji
      });
  
      if (!errors.isEmpty()) {
        const currentUser = await User.findOne({ username: req.user.username }).exec();
        res.render('image_form', {
          title: 'Edit Image',
          image: image,
          galleries: await Gallery.find({ user: currentUser._id }).exec(),
          errors: errors.array()
        });
        return;
      }
  
      await Image.findByIdAndUpdate(req.params.id, image, {});
      res.redirect('/galleries/gallery_browse');
    })
  ];
  
  exports.image_delete_post = asyncHandler(async (req, res, next) => {
    await Image.findByIdAndDelete(req.params.id).exec();
    res.redirect('/galleries/gallery_browse');
  });

  // imageController.js

exports.image_comment_get = asyncHandler(async (req, res, next) => {
  try {
    const image = await Image.findById(req.params.id).populate('gallery').exec();
    const comments = await Comment.find({ image: req.params.id }).populate('user').exec();

    res.render('image_comment', { title: 'Add Comment', image: image, comments: comments });
  } catch (err) {
    next(err);
  }
});



exports.image_comment_post = asyncHandler(async (req, res, next) => {
  const currentUser = await User.findOne({ username: req.user.username }).exec();
  try {
    const comment = new Comment({
      text: req.body.comment,
      user: currentUser._id,
      image: req.params.id
    });

    await comment.save();


    res.redirect(`/images/${req.params.id}/comment`);
  } catch (err) {
    console.error(err);

  }
});