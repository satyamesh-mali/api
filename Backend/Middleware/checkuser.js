const jwt = require("jsonwebtoken");
const SECRET = "AJTAsisthebest";
const userSchema = require("../Mongodb/mongomodel/userschema");

const checkuser = () => {
  return (req, res, next) => {
    const token = req.header("auth-token");
    if (!token) {
      req.success = false;
      return res.status(404).json({ msg: "hey login with correct credentials", success: false });
    }

    const data = jwt.verify(token, SECRET);
    req.success = true;
    req.userdata = data;
    console.log(data);
    next();
  };
};

module.exports = checkuser;
