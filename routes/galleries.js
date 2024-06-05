

var express = require('express');
var router = express.Router();
const authenticate = require('../middleware/authenticate');

const Galleries = require('../models/gallery');
const gallery_controller = require('../controllers/galleryControllers')


// Definicja ścieżki GET /
router.get('/', async (req, res) => {
  
  const all_galleries = await Galleries.find({}).populate('user').exec();
    res.render("gallery_list", { title: "List of all gallerise:", gallery_list: all_galleries });

  

});


router.get("/gallery_add",authenticate, gallery_controller.gallery_add_get);

router.post("/gallery_add",authenticate, gallery_controller.gallery_add_post);

// GALLERY BROWSE GET
router.get("/gallery_browse", gallery_controller.gallery_browse_get);
// GALLERY BROWSE POST
router.post("/gallery_browse", gallery_controller.gallery_browse_post);


router.get('/delete', authenticate, gallery_controller.gallery_delete_get);
router.post('/delete', authenticate, gallery_controller.gallery_delete_post);



module.exports = router;



