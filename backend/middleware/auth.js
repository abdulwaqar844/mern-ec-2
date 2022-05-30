const jwt = require("jsonwebtoken");
const User = require("../modals/User");
exports.authenticateToken = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({ message: "Not Autorized" });
    }
  }
  if (!token) {
    res.status(400).json({ message: " Not Authorizeda" });
  }
};
