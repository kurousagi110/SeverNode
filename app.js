const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors'); //import cors
const session = require('express-session');
const mongoose = require('mongoose');
require('./components/category/Model')
require('./components/product/Model')
require('./components/user/Model')

const indexRouter = require('./routes/index');
const userCpanelRouter = require('./routes/cpanel/user');
const productCpanelRouter = require('./routes/cpanel/product');
const userAPIRouter = require('./routes/api/user');
const productAPIRouter = require('./routes/api/product');
const taiRouter = require('./routes/tai');


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//khai báo thong tin session, cookie
app.use(session({
  secret: 'iloveyou',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
}));

//khai báo cors
app.use(cors({ 
  origin: ['http://localhost:3000', 'http://localhost:3001',],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));


//conect to mongodb
mongoose.connect('mongodb://127.0.0.1:27017/admin?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('>>>>>>>>>> DB Connected!!!!!!'))
  .catch(err => console.log('>>>>>>>>> DB Error: ', err));

// http://localhost:3000
app.use('/', indexRouter);
// http://localhost:3000/cpanel/users
app.use('/cpanel/users', userCpanelRouter);
// http://localhost:3000/cpanel/products
app.use('/cpanel/products', productCpanelRouter);
// http://localhost:3000/api/users
app.use('/api/users', userAPIRouter);
// http://localhost:3000/api/products
app.use('/api/products', productAPIRouter);

//http://localhost:3000/tai
app.use('/tai', taiRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;



/**
 * - Không tiếng việt
 * - Không dùng dấu cách
 * - Không khoảng trắng
 * - Không /users/nguyễn văn an/Lập trình server cho Android/
 * - Không telex
 */


// http://localhost:3000/

/**
 * Vào folder rỗng
 * express --view=hbs BackEnd
 * Mở visual code tại folder BackEnd
 * Mở terminal
 * npm i nodemon
 * Mở package.json
 * Thêm vào scripts: "dev": "nodemon ./bin/www",
 * npm run dev
 * http://localhost:3000/
 */


/**
 * Lab 2: Tạo 2 route mới
 * 1. Route: /dien-tich
 *  - Method: GET
 *  - Input: 2 tham số: a, b
 *  - Params: Loại hình
 *  - Query: a, b, c, ...
 *  http://localhost:3000/dien-tich/hinh-tron?&a=10&b=20
 *  - Output: Diện tích có dùng bootstrap
 * 2. Route: /chu-vi
 *  - Method: POST
 *  - Input: 2 tham số: a, b
 *  - Body: Loại hình
 *  - Query: a, b, c, ...
 *  http://localhost:3000/chu-vi?a=10&b=20
 *  - Output: JSON
 */