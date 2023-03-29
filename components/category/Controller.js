const categoryService = require('./Service');

const getAllCategories = async () => {
    try {
        return await categoryService.getAllCategories();
    } catch (error) {
        console.log('Category controller getAllCategory error: ',error);
        throw error;
    }
};

module.exports = {getAllCategories}