const userModel = require('./Model');
const bcrypt = require('bcryptjs');
const AppConstans = require('../../constants/AppConstants');

const login = async (email, password) => {

    try {
        // const user = data.find(item => item.email == email);
        // if (user && user.password == password) {
        //     return user;
        // }
        // return null;
        let user = await userModel.findOne({ email });
        if (user) {
            const isMatch = bcrypt.compareSync(password, user.password);
            return isMatch ? user : false;
        }

    } catch (error) {
        console.log('User service login error: ', error);
    }
    return false;

};
const register = async (email, password, name) => {
    try {
        let user = await userModel.findOne({ email });
        if (!user) {
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(password, salt);
            await userModel.create({
                email: email,
                password: hash,
                name: name,
                cart: [],
                role: AppConstans.ROLES.USER
            });
            return true;
        }
    } catch (error) {
        console.log('User service register error: ', error);
    }
    return false;
};
const addCart = async (id, name, price, quantity, image) => {
    try {
        let user = await userModel.findById(id);
        console.log('111111111111111',user);
        console.log('111111111111111',user.cart);
        
        if (user) {
            for (let i = 0; i < user.cart.length; i++) {
                if (user.cart[i].name == name) {
                    user.cart[i].quantity += 1;
                    await user.save();
                    var cart = user.cart[i];
                    console.log('2222',cart);
                    return cart;
                }
            }
            if(!cart ){
                    user.cart.push({
                        name: name,
                        price: price,
                        quantity: 1,
                        image: image
                    }); // thêm mục giỏ hàng mới vào mảng giỏ hàng hiện có
                    await user.save();
                    return true;
            }
        }
    } catch (error) {
        console.log('Lỗi dịch vụ người dùng addCart: ', error);
    }
}
const getCartById = async (id) => {
    try {
        let user = await userModel.findById(id);
        if (user) {
            console.log(user.cart);
            return user.cart;
        }
    } catch (error) {
        console.log('Lỗi dịch vụ người dùng getCartById: ', error);
    }
    return null;
}
module.exports = { login, register, addCart, getCartById }
var data = [
    { _id: 1, email: '123@gmail.com', password: '123', name: 'Hoang' },
    { _id: 2, email: 'nghiadaumoi@gmail.com', password: '123456', name: 'nghia' },
    { _id: 3, email: 'nghiadaubuoi@gmail.com', password: '123456', name: 'trong' },
    { _id: 4, email: 'nghiamatheo@gmail.com', password: '123456', name: 'huan' },
    { _id: 5, email: 'nghialolicon@gmail.com', password: '123456', name: 'an' },
]