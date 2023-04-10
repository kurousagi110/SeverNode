var express = require('express');
var router = express.Router();
const productController = require('../../components/product/Controller');
const {authenAPI} = require('../../middle/Authen');

// http://localhost:3000/api/products

// http://localhost:3000/api/products/get-all
router.get('/get-all',[],async function (req, res, next) {
    try {
        const products = await productController.getAllProduct();
        return res.status(200).json({ result: true, data: products });
    } catch (error) {
        return res.status(500).json({ result: false, products: null });
    }
});
// http://localhost:3000/api/products/search?price=1000
router.get('/search', async function (req, res, next) {
    try {
        const name = req.query;
        const products = await productController.searchProduct(name);
        return res.status(200).json({ result: true, products });
    } catch (error) {
        return res.status(500).json({ result: false, products: null });
    }
});
// http://localhost:3000/api/products/get-by-id/5f9f1b0b1b9b9c1e1c8c1c1c
router.get('/get-by-id/:id', async function (req, res, next) {
    try {
        const id = req.params.id;
        const product = await productController.getProductById(id);
        console.log(product);
        if (product) {
            return res.status(200).json({ result: true, product });
        }else{
            return res.status(404).json({ result: false, product: null });
        }
    } catch (error) {
        return res.status(500).json({ result: false, product: null });
    }
});


module.exports = router;
