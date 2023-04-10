
const checkRegister = (req, res, next) => {
    const { email, password, confirmPassword, name } = req.body;
    if (!name || !email || !password || !confirmPassword) {
        return res.status(400).json({ status: false, message: 'Tất cả các trường đều là bắt buộc' });
    }else{
        let regex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
        if (!regex.test(email)) {
            return res.status(400).json({ status: false, message: 'Email không đúng định dạng' });
        }
        // let regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
        // if (!regexPassword.test(password)) {
        //     return res.status(400).json({ status: false, message: 'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ và số' });
        // }
        if (password !== confirmPassword) {
            return res.status(400).json({ status: false, message: 'Mật khẩu không khớp' });
        }
    }

    return next();
};

module.exports = { checkRegister };