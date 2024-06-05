const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const Gallery = require('../models/gallery');
const User = require('../models/user');
const Image = require("../models/image");

exports.gallery_add_get = asyncHandler(async (req, res, next) => {
    const currentUser = await User.findOne({ username: req.user.username }).exec();
    let all_users;
    if (req.user.username === 'admin') {
        all_users = await User.find().sort({ last_name: 1 }).exec();
    } else {
        all_users = [currentUser];
    }
    res.render("gallery_form", {
        title: "Add gallery",
        users: all_users,
    });
});

exports.gallery_add_post = [
    body("g_name")
        .trim()
        .isLength({ min: 2 })
        .escape()
        .withMessage("Gallery name too short."),
    body("g_description")
        .trim()
        .isLength({ min: 2 })
        .escape()
        .withMessage("Description too short."),

    asyncHandler(async (req, res, next) => {
        console.log("Dane z formularza:", req.body);

        const errors = validationResult(req);

        const gallery = new Gallery({
            name: req.body.g_name,
            description: req.body.g_description,
            user: req.body.g_user
        });

        if (!errors.isEmpty()) {
            let all_users;
            if (req.user.username === 'admin') {
                all_users = await User.find().sort({ last_name: 1 }).exec();
            } else {
                all_users = [currentUser];
            }
            res.render("gallery_form", {
                title: "Add gallery",
                gallery: gallery,
                users: all_users,
                errors: errors.array(),
            });
        } else {
            const galleryExists = await Gallery.findOne({
                name: req.body.g_name,
                user: req.body.g_user,
            }).collation({ locale: "en", strength: 2 }).exec();

            if (galleryExists) {
                res.send("Gallery exists");
            } else {
                await gallery.save();
                res.redirect("/galleries");
            }
        }
    })
];

exports.gallery_browse_get = asyncHandler(async (req, res, next) => {
    const all_galleries = await Gallery.find({}).exec();
    if (all_galleries.length > 0) {
        const firstGallery = all_galleries[0];
        const gallery_images = await Image.find({ gallery: firstGallery._id }).exec();
        
        res.render("gallery_browse", { title: "View gallery:", galleries: all_galleries, images: gallery_images, selectedGallery: firstGallery._id });
    } else {
        res.render("gallery_browse", { title: "View gallery:", galleries: all_galleries, images: [], selectedGallery: null });
    }
    });

    // Kontroler POST
exports.gallery_browse_post = asyncHandler(async (req, res, next) => {
    const all_galleries = await Gallery.find({}).exec();
    const gallery_images = await Image.find({gallery: req.body.s_gallery}).exec();
    res.render("gallery_browse", { title: "View gallery:", galleries: all_galleries, images: gallery_images, selectedGallery: req.body.s_gallery});
});

exports.gallery_delete_get = asyncHandler(async (req, res, next) => {

    const currentUser = await User.findOne({ username: req.user.username }).exec();
    const userGalleries = await Gallery.find({ user: currentUser._id }).exec();
    res.render("gallery_delete", {
      title: "Delete Gallery",
      galleries: userGalleries,
    });
  });

  exports.gallery_delete_post = asyncHandler(async (req, res, next) => {
    console.log("params",req.body.gallery_id)
    const galleryId = req.body.gallery_id;
    
    console.log("galeria: ", galleryId)
    const currentUser = await User.findOne({ username: req.user.username }).exec();
    const gallery = await Gallery.findOne({ _id: galleryId, user: currentUser._id }).exec();

    
    
    if (!gallery) {
      return res.status(404).send("Gallery nie znaleziona ");
    }
  
    const imageCount = await Image.countDocuments({ gallery: galleryId }).exec();
    if (imageCount > 0) {
      return res.status(400).send("Nie można usunąć, ponieważ galeria nie jest pusta");
    }
  
    await Gallery.findByIdAndDelete(galleryId).exec();
  
    res.redirect("/galleries/delete");
  });