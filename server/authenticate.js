const jwt = require("jsonwebtoken");
require("dotenv").config();

verifyUser = (req, res, next) => {
  try {
    token = req.headers.authorization.split(" ")[1];

    checktoken = jwt.verify(token, process.env.SECRET_TOKEN);
    req.user = checktoken.id;
  } catch (err) {
    return res.status(401).json({message: "user not registered"});
  }
  next();
};
module.exports = verifyUser;
