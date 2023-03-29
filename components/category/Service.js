const categoryModel = require('./Model');
const getAllCategories = async () => {
  try {
    return await categoryModel.find();
  } catch (error) {
    console.log(error);
  }
}

module.exports = { getAllCategories };
var data = [{
  "_id": 1,
  "name": "Marielle"
}, {
  "_id": 2,
  "name": "Carly"
}, {
  "_id": 3,
  "name": "Katheryn"
}, {
  "_id": 4,
  "name": "Jenda"
}, {
  "_id": 5,
  "name": "Loise"
}, {
  "_id": 6,
  "name": "Kelsi"
}, {
  "_id": 7,
  "name": "Diane-marie"
}, {
  "_id": 8,
  "name": "Hubey"
}, {
  "_id": 9,
  "name": "Lefty"
}, {
  "_id": 10,
  "name": "Imogene"
}]