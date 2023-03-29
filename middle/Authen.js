const jwt = require('jsonwebtoken');

const authenWeb = (req, res, next) => {
    const { session } = req;
    const url = req.originalUrl.toLowerCase();
    if (!session) {
        // nếu chưa login
        if (url.includes('login')) {
            next();
        } else {
            res.redirect('/login');
        }
    } else {
        const { token } = session;
        if (!token) {
            if (url.includes('login')) {
                next();
            } else {
                res.redirect('/login');
            }
        } else {
            jwt.verify(token, 'secret', function (error, decoded) {
                if (error) {
                    if (url.includes('login')) {
                        next();
                    } else {
                        res.redirect('/login');
                    }
                } else {
                    // nếu đã login
                    if (url.includes('login')) {
                        // qua home
                        res.redirect('/');
                    } else {
                        next();
                    }
                }
            })
        }
    }
}

module.exports = { authenWeb };