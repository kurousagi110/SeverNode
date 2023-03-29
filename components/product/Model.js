const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectID = Schema.ObjectId;

const schema = new Schema({
    id: {type : ObjectID}, //khóa chính
    name: { type: String},
    price: { type: Number},
    quantity: { type: Number},
    image: { type: String},
    category: { type: ObjectID, ref: 'category'},
});

module.exports = mongoose.model('product', schema);
//category => categories trong database
//
//  * collections = table
//  * document = row
//  * field = column
//  *