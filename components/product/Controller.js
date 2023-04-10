const productService = require('./Service');

const getAllProduct = async (page,size) => {
    try {
        return await productService.getAllProduct();
    } catch (error) {
        console.log('Product controller getAllProduct error: ',error);
        throw error;
    }
};

const deleteProductById = async (id) => {
    try {
        return await productService.deleteProduct(id);
    } catch (error) {
        console.log('Product controller deleteProduct error: ',error);
        throw error;
    }
};
const addProduct = async(name, price, quantity, image, category)=>{
    try {
        return await productService.addProduct(name, price, quantity, image, category);
    } catch (error) {
        console.log('Product controller addProduct error: ',error);
        return false;
    }
}
const getProductById = async (id) => {
    try {
        return await productService.getProductById(id);
    } catch (error) {
        console.log('Product controller getProductById error: ',error);
        return null;
    }
}
const updateProductById = async (id, name, price, quantity, image, category) => {
    try {
        return await productService.updateProductById(id, name, price, quantity, image, category);
    } catch (error) {
        console.log('Product controller updateProductById error: ',error);
        return false;
    }
}

const searchProduct = async (name) => {
    try {
        return await productService.searchProduct(name);
    } catch (error) {
        console.log('Product controller searchProduct error: ',error);
        return null;
    }
}

module.exports = {getAllProduct, deleteProductById, addProduct, getProductById, updateProductById, searchProduct}