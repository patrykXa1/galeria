const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");

router.get('/', async (req, res) => {
  try {
    const usersCount = await mongoose.connection.db.collection('users').countDocuments();
    const imagesCount = await mongoose.connection.db.collection('images').countDocuments();
    const galleriesCount = await mongoose.connection.db.collection('galleries').countDocuments();
    
    res.render('stats', { title: 'Stats', usersCount, imagesCount, galleriesCount });  } catch (err) {
    console.error(err);
    res.status(500).send('Wystąpił błąd podczas pobierania danych.');
  }
});

module.exports = router;
