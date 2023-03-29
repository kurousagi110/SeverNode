var express = require('express');
var router = express.Router();
const productController = require('../../components/product/Controller');
const categoryController = require('../../components/category/Controller');
const upload = require('../../middle/uploadFile');
const { authenWeb } = require('../../middle/Authen');


// http://localhost:3000/cpanel/products
router.get('/',[authenWeb], async function (req, res, next) {
    const products = await productController.getAllProduct();
    res.render('product/list', { products });
});
//http://localhost:3000/cpanel/products/:id/delete
router.get('/:id/delete',[authenWeb], async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await productController.deleteProductById(id);
        return res.json({ result });
    } catch (error) {
        next(error);
        return res.json({ result: false });
    }
});
//http://localhost:3000/cpanel/products/new
//hiển thị form thêm sản phẩm
router.get('/new',[authenWeb], async (req, res, next) => {
    try {
        const categories = await categoryController.getAllCategories();
        res.render('product/new', { categories });
    } catch (error) {
        console.log("hiển thị form sản phẩm thất bại ",error);
        next(error);
    }

});
//hiển thị trang  sửa sản phẩm
//http://localhost:3000/cpanel/products/:id/edit
// router.get('/:id/edit', async (req, res, next) => {
//     try {
//         const { id } = req.params;
//         const product = await productController.getProductById(id);
//         let categories = await categoryController.getAllCategories();
//         categories = categories.map(item => {
//             item.selected = false;
//             if (item._id.toString() === product.category._id.toString()) {
//                 item.selected = true;
//             }
//             return item;
//         });
//         res.render('product/edit', { product, categories });
//     } catch (error) {
//         next(error);
//     }
// });
//http://localhost:3000/cpanel/products/new
//xử lý thêm mới
//middleware: trung gian
router.post('/new', [ authenWeb, upload.single('image')] ,async (req, res, next) => {
    try {
        let {file, body} = req;
        if(file) {
            file = `http://172.16.80.167:3000/images/${file.filename}`;
            body={...body, image: file};
        }
        let { name, price, quantity,image,category } = body;
        const result = await productController.addProduct( name, price, quantity, image,category );
        if (result) {
            return res.redirect('/cpanel/products');
        }
        return res.redirect('/cpanel/products/new');
    } catch (error) {
        console.log("thêm mới thất bại ",error);
        next(error);
    }
});

//http://localhost:3000/cpanel/products/:id/edit
//hiển thị form sửa sản phẩm
router.get('/:id/edit',[authenWeb], async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await productController.getProductById(id);
        let categories = await categoryController.getAllCategories();
        for (let index = 0 ; index < categories.length; index++) {
            const element = categories[index];
            categories[index].selected = false;
            if (element._id.toString() === product.category.toString()) {
                categories[index].selected = true;
            }
        }
        res.render('product/edit', { product, categories });
    } catch (error) {
        console.log(error);
        next(error);
    }

});


//http://localhost:3000/cpanel/products/:id/edit
//xử lý cập nhật
//middleware: trung gian
router.post('/:id/edit', [authenWeb, upload.single('image')] ,async (req, res, next) => {
    try {
        let { id } = req.params;
        let {file, body} = req;
        if(file) {
            file = `http://172.16.80.167:3000/images/${file.filename}`;
            body={...body, image: file};
        }
        let { name, price, quantity,image,category } = body;
        const result = await productController.updateProductById(id, name, price, quantity, image,category );
        if (result) {
            return res.redirect('/cpanel/products');
        }
        return res.redirect('/cpanel/products/new');
    } catch (error) {
        console.log(error);
        next(error);
    }
});
module.exports = router;
