const userServices = require('./Service');
const mailer = require('nodemailer');


const transporter = mailer.createTransport({
    pool: true,
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use TLS
    auth: {
        user: 'hoatrinh14020@gmail.com',
        pass: 'xtbceynfxxpndphh'
    },
});
const sendOTP = async (to, subject, content) => {
    try {
        const otp = Math.floor(1000 + Math.random() * 9000);
        const mailOptions = {
            from: 'An bịp nè <hoatrinh14020@gmail.com>'
            , to: to
            , subject: 'Verify your email'+subject
            , text: `Your OTP is ${otp}`
            , html: content
        };
        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.log('User Controller send mail erro: ', error);
    }
    return false;
};


const login = async (email, password) => {
    try {
        return await userServices.login(email, password);
    } catch (error) {
        throw error;
    }
};
const register = async (email, password, name) => {
    try {
        return await userServices.register(email, password, name);
    } catch (error) {
        throw error;
    }
};
const addCart = async (id, name, price, quantity, image) => {
    try {
        return await userServices.addCart(id, name, price, quantity, image);
    } catch (error) {
        throw error;
    }
}
const getCartById = async (id) => {
    try {
        return await userServices.getCartById(id);
    } catch (error) {
        throw error;
    }   
}

module.exports = {login, register, sendOTP, addCart,getCartById}