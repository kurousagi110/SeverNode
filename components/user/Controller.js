const userServices = require('./Service');

const login = async (email, password) => {
    try {
        return await userServices.login(email, password);
    } catch (error) {
        throw error;
    }
};
module.exports = {login}