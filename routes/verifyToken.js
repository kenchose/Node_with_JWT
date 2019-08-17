const jwt = require("jsonwebtoken");

//MIDDELWARE FUNCTION WHERE WE ADD TO ROUTES THAT WE WANT PROTECTED
module.exports = function (req, res, next) {
    const token = req.header('auth-token');
    if(!token) return res.status(401).send("Access denied!");

    try {
        const verfired = jwt.verify(token, process.env.TOKEN_SECRET); //sends back the ID payload
        req.user = verfired;
        next();
    } catch(err) {
        res.status(400).send("Invalid token");
    }
}