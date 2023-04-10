const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectID = Schema.ObjectId;
const AppConstans = require('../../constants/AppConstants');

const schema = new Schema({
    id: {type : ObjectID}, //khóa chính
    name: { type: String},
    email: { type: String, unique: true, required: true},
    password: { type: String, required: true},
    cart: [{
        id: { type: ObjectID },
        name: { type: String },
        price: { type: Number },
        quantity: { type: Number },
        image: { type: String },
    }],
    role: { type: Number, default: AppConstans.ROLES.USER },
});

module.exports = mongoose.models.users|| mongoose.model('user', schema);
//category => categories trong database
//
//  * collections = table
//  * document = row
//  * field = column
//  *