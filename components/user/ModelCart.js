const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectID = Schema.ObjectId;

const schema = new Schema({
    id: { type: ObjectID },
    name: { type: String },
    price: { type: Number },
    quantity: { type: Number },
    image: { type: String },
});
module.exports = mongoose.models.users || mongoose.model('user', schema);