var express = require('express');
var router = express.Router();

const Images = require('../models/image');
const image_controller = require('../controllers/imageController')
const authenticate = require('../middleware/authenticate');

// Definicja ścieżki GET /
router.get('/', async (req, res) => {
  
  const all_images = await Images.find({}).populate("gallery").exec();
  res.render("image_list", { title: "List of all images:", image_list: all_images });

});


//IMAGE ADD GET
router.get("/image_add",authenticate,image_controller.image_add_get);
//IMAGE ADD POST
router.post("/image_add",authenticate, image_controller.image_add_post);

// Trasa GET do edycji obrazka
router.get('/:id/edit', authenticate, image_controller.image_edit_get);

// Trasa POST do edycji obrazka
router.post('/:id/edit', authenticate, image_controller.image_edit_post);

// Trasa POST do usuwania obrazka
router.post('/:id/delete', authenticate, image_controller.image_delete_post);

router.get('/:id/comment',authenticate, image_controller.image_comment_get);
router.post('/:id/comment',authenticate, image_controller.image_comment_post);

module.exports = router;



