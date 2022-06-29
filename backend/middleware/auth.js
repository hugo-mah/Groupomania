const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        req.auth = {userId};
        if (req.body.userId && req.body.userId !== userId) {
            throw 'Utilisateur non identifié';
        } else {
            next();
        }
    } catch {
        res.status(403).json({
        error: "Non authentifié"
        });
    }
};