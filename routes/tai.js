var express = require('express');
var router = express.Router();


// http://localhost:3000/tai/hinhtron/3
router.get('/hinhtron/:a', function (req, res, next) {
    let a = req.params.a;
    console.log(a);
    let dienTich = a * a * Math.PI;
    res.render('chuvi', {dienTich});
});
// http://localhost:3000/tai/hinhvuong/3
router.get('/hinhvuong/:a', function (req, res, next) {
    let a = req.params.a;
    console.log(a);
    let dienTich = a * a;
    res.render('chuvi', {dienTich});
});
// http://localhost:3000/tai/hinhchunhat/3/4
router.get('/hinhchunhat/:a/:b', function (req, res, next) {
    let a = req.params.a;
    let b = req.params.b;
    console.log(a);
    let dienTich = a * b;
    res.render('chuvi', {dienTich});
});


// Route tinh dien tich hinh tron
// http://localhost:3000/tai/dien-tich?a=3&b=4&loaiHinh=hinh-tron
router.get('/dien-tich', function (req, res, next) {
    const a = req.query.a;
    const b = req.query.b;
    const loaiHinh = req.query.loaiHinh;
    let dienTich;
    if (loaiHinh === 'hinh-chu-nhat') {
        dienTich = a * b;
    } else if (loaiHinh === 'hinh-tron') {
        
        dienTich = Math.PI * a * a;
    } else if (loaiHinh === 'hinh-vuong') {
        dienTich = a * a;
    } else {
        return res.status(400).send({ error: 'Loai hinh khong hop le' });
    }
    res.render('dientich', {dienTich , loaiHinh});
});

// Route tinh chu vi hinh chu nhat hoac hinh tron
// http://localhost:3000/tai/tinh-chu-vi
router.post('/tinh-chu-vi', function(req, res, next) {
    const {a, b, loaiHinh} = req.body;
    let chuVi;
    
    if (loaiHinh === 'hinh-chu-nhat') {
      chuVi = 2 * (a + b);
    } else if (loaiHinh === 'hinh-tron') {
      chuVi = 2 * Math.PI * a;
    } else if (loaiHinh === 'hinh-vuong') {
      chuVi = 4 * a;
    } else {
      return res.status(400).send({ error: 'Loai hinh khong hop le' });
    }
  
    res.json({ chuVi });
  });

module.exports = router;