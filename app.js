const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/galleries', express.static(path.join(__dirname, 'public/images')));

app.use(bodyParser.urlencoded({ extended: false }));
// Użyj body-parser do parsowania danych w formacie JSON
app.use(bodyParser.json());
app.use(cookieParser());

const usersRouter = require('./routes/users');
app.use('/Users', usersRouter);

var imagesRouter = require('./routes/images');
app.use('/images', imagesRouter);

var galleriesRouter = require('./routes/galleries');
app.use('/galleries', galleriesRouter);

const statsRouter = require('./routes/stats'); 
app.use('/stats', statsRouter);

const indexRouter = require('./routes/index'); 
app.use('/', indexRouter);
const mongoose = require("mongoose");
mongoose.set("strictQuery", false); 
const mongoDB = "mongodb://localhost:27017/GaleriaDB"; 
main().catch((err) => console.log(err)); 
async function main() { await mongoose.connect(mongoDB); }




const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
