const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectID = Schema.ObjectId;

const categorySchema = new Schema({
    id: {type : ObjectID}, //khóa chính
    name: {
        type: String,
        require: true, //bắt buộc phải có
        unique :true, //k trùng
        trim: true, //xóa khoảng trắng đầu + cuối
        minlength: 3, //độ dài tối thiểu
        maxlength: 255, //độ dài tối đa
        default : 'No name' //giá trị mặc định
    },
});

module.exports = mongoose.model('category', categorySchema);
//category => categories trong database
//
//  * collections = table
//  * document = row
//  * field = column
//  *