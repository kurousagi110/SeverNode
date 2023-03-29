var express = require('express');
var router = express.Router();
 const userServices = require('../components/user/Controller');
 const jwt = require('jsonwebtoken');
 const { authenWeb } = require('../middle/Authen');


// http://localhost:3000/
// hiển thị trang chủ
router.get('/',[authenWeb], async(req, res, next) => {
  res.render('index');
});
//http://localhost:3000/login
//hiển thị trang login
router.get('/login',[authenWeb], async(req, res, next) => {
  res.render('user/login');
});

//http://localhost:3000/login
//xử lí trang login
//kiểm tra email, password
//thành công, chuyển sang trang chủ
//ngược lại, chuyển sang trang login
router.post('/login', async(req, res, next) => {
    try {
      const {email, password} = req.body;
      const result = await userServices.login(email, password);
      if(result) {
        //tạo token   
        const token = jwt.sign({id :1 , name:'Hello'},
                                'secret', {expiresIn: '1h'});
        //lưu token vào session
        req.session.token = token;
       return res.redirect('/');

      } else {
       return res.redirect('/login');
      }
    } catch (error) {
      console.log(error);
      return res.redirect('/login');
    }
});

//http://localhost:3000/logout
//xử lí trang logout
router.get('/logout', async(req, res, next) => {
  try {
    res.session.destroy();
    return res.redirect('/login');
  } catch (error) {
    console.log('logout error', error);
      return res.redirect('/login');
  }
});

module.exports = router;
/* GET home page. */
// http://localhost:3000/hello/
// router.get('/hello', async function(req, res, next) {
//   console.log('Get đang chạy nè');
//   res.render('index', { title: 'Express' });
// });
// // http://localhost:3000/hello
// router.post('/hello', function(req, res, next) {
//   console.log('Post đang chạy nè');
//   res.render('index', { title: 'Express' });
// });

// // http://localhost:3000/query?a=1&b=2&c=3
// router.get('/query', function(req, res, next) {
//   const { a, b, c } = req.query;
//   // giải pt bậc 2, hiện kết quả
//   const delta = b*b - 4*a*c;
//   let kq = '';
//   if(delta < 0) {
//     kq = 'Phương trình vô nghiệm';
//   } else if(delta === 0) {
//     kq = 'Phương trình có nghiệm kép: ' + (-b/(2*a));
//   } else {
//     kq = 'Phương trình có 2 nghiệm phân biệt: ' 
//     + ((-b + Math.sqrt(delta))/(2*a)) + ', ' 
//     + ((-b - Math.sqrt(delta))/(2*a));
//   }
//   res.render('index', { kq });
// });

// // http://localhost:3000/body
// router.post('/body', function(req, res, next) {
//   const { a, b, c } = req.body;
//   let kq = a + b + c;
//   res.render('hello', { kq });
// });

// // http://localhost:3000/params/1/2/3
// router.post('/params/:a/:b/:c', function(req, res, next) {
//   try {
//     const { a, b, c } = req.params;
//     let kq = a + b + c;
//     // res.render('index', { kq });
//     res.json({ kq });
    
//   } catch (error) {
//     next();
//   }  
// });





/**
 * req, res, next
 * req: request (yêu cầu gửi từ client)
 *  - req.query: query string (dữ liệu gửi lên url)
 *  http://localhost:3000/hello?name=abc&age=18
 *  - req.body: body (dữ liệu gửi lên từ form)
 *  - req.session: session (dữ liệu lưu trên server)
 *  - req.params: params (dữ liệu gửi lên từ url)
 * res: response (phản hồi từ server)
 *  - res.render: render ra view (WEB)
 *  - res.json: trả về dữ liệu dạng json (API)
 *  - res.send: trả về dữ liệu dạng text (API)
 *  - res.redirect: chuyển hướng (WEB)
 * next: hàm tiếp theo
 */


/**
 * HTTP Request Methods
 * Get: Lấy dữ liệu (url + enter)
 * Post: Tạo dữ liệu (form + submit)
 */
