const jwt = require("jsonwebtoken");
verifyUser = (req, res, next) => {
  try {
    token = req.headers.authorization.split(" ")[1];

    checktoken = jwt.verify(token, "jkkkdkdkdjf");
    req.user = checktoken.id;
  } catch (err) {
    return res.status(401).json({message: "user not registered"});
  }
  next();
};
module.exports = verifyUser;
