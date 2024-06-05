const express = require('express');
const router = express.Router();
const Users = require('../models/user');

const user_controller = require('../controllers/userControllers')

// Definicja ścieżki GET /
router.get('/', async (req, res) => {
  // Pobranie wszystkich użytkowników z bazy danych
  const all_users = await Users.find({}).exec();
  console.log('Pobrani użytkownicy:', all_users);

  res.render("user_list", { title: "Users",
  user_list: all_users });

});

// Obsługa GET: http://localhost/users/user_add
router.get("/user_add", user_controller.user_add_get);
// Obsługa POST: http://localhost/users/user_add
router.post("/user_add", user_controller.user_add_post);


//USER LOGIN GET (/users/user_login)
router.get("/user_login", user_controller.user_login_get);
//USER LOGIN POST(/users/user_login)
router.post("/user_login", user_controller.user_login_post);
//USER LOGOUT GET (/users/user_logout)
router.get("/user_logout", user_controller.user_logout_get);

module.exports = router;



