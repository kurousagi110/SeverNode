var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const userController = require('../../components/user/Controller');
const {checkRegister} = require('../../middle/Validation');
const upload = require('../../middle/uploadFile');


/* GET users listing. */
// http://localhost:3000/api/users


// http://localhost:3000/api/users/login
router.post('/login', async  (req, res, next) =>{
  try {
    const { email, password } = req.body;
    const user = await userController.login(email, password);
    if (user) {
      // tạo token
      const token = jwt.sign({user}, 'secret', { expiresIn: '1h' });
      return res.status(200).json({ data: {result: true, user, token } });
    } else {
      return res.status(400).json({ result: false, user: null });
    }
  } catch (error) {
    return res.status(500).json({ result: false, user: null });
  }
});
// http://localhost:3000/api/users/register
router.post('/register',[checkRegister], async function (req, res, next) {
  try {
    const { email, password, name } = req.body;
    const result = await userController.register(email, password, name);
    if (result) {
      res.status(200).json({ result: true });
    } else {
      res.status(400).json({ result: false });
    }
  } catch (error) {
    res.status(500).json({ result: false });
  }
});

//upload ảnh lên server
// http://localhost:3000/api/users/upload-image
router.post('/upload-image', [upload.single('image')], async function (req, res, next) {
  try {
    let { file } = req;
    if (file) {
      let path = `http://localhost:3000/images/${file.filename}`; //để ip của máy
      return res.status(200).json({ result: true, path });
    }
    return res.status(400).json({ result: false });
  } catch (error) {
    console.log('upload image error: ', error);
    return res.status(500).json({ result: false });
  }
});
// http://localhost:3000/api/users/upload-images
router.post('/upload-images', [upload.array('images', 10)], async function (req, res, next) {
  try {
    let files = req.files;
    if (files && files.length > 0) {
      let paths = files.map((file) => {
        return `http://localhost:3000/images/${file.filename}`;
      });
      return res.status(200).json({ result: true, paths });
    }
    return res.status(400).json({ result: false });
  } catch (error) {
    console.log('upload image error: ', error);
    return res.status(500).json({ result: false });
  }
});

// http://localhost:3000/api/users/send-mail
router.post('/send-mail', async function (req, res, next) {
  try {
    const {to , subject} = req.body;
    const content = `
    <h1>Chào mừng bạn tới ứng dụng của chúng tôi</h1>
    <p>Chúc mừng bạn đã đăng ký thành công</p>
    <p>Chúng tôi rất vui khi được phục vụ bạn</p>
    `
    const result = await userController.sendOTP(to, subject, content);
    if (result) {
      res.status(200).json({ result: true });
    }else{
      res.status(400).json({ result: false });
    }
  } catch (error) {
    console.log('send mail error: ', error);
    res.status(500).json({ result: false });
  }
});
//http://localhost:3000/api/users/add-cart/:id
router.post('/add-cart/:id', async function (req, res, next) {
  try {
    const {id} = req.params;
    const { name, price, quantity, image } = req.body;
    console.log('name: ', name);
    const result = await userController.addCart(id, name, price, quantity, image);
    if (result) {
      res.status(200).json({ result: true });
    } else {
      res.status(400).json({ result: false });
    }
  } catch (error) {
    console.log('add cart error: ', error);
    res.status(500).json({ result: false });
  }
});
//http://localhost:3000/api/users/get-cart/:id
router.get('/get-cart/:id', async function (req, res, next) {
  try {
    const {id} = req.params;
    const result = await userController.getCartById(id);
    console.log('result: ', result);
    if (result) {
      res.status(200).json({ cart: result });
    } else {
      res.status(400).json({ result: false });
    }
  } catch (error) {
    console.log('get cart error: ', error);
    res.status(500).json({ result: false });
  }
});
module.exports = router;
