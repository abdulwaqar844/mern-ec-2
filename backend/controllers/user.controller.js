const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const User = require("./../modals/User");
exports.register = async (req, res) => {
  const { fullname, email, password, avatar } = req.body;
  if (!email && !password) {
    return res.status(400).send({
      message: "user & email and password can not be empty",
    });
  }
  try {
    const data = await User.findOne({ email: email });
    if (data) {
      return res.status(400).send({
        message: "Email already exist",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = new User({ fullname, email, password: hash, avatar });
    await user.save();
    const payload = {
      id: user.id,
    };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "3h" },
      (err, token) => {
        if (err) throw err;

        res.json({ token, email, fullname });
      }
    );
  } catch (error) {
    return res.status(400).json({ error });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).send({ message: "Email is Not Registered" });
      // return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ message: "Invalid Password" });
    }
    const { fullname } = user;
    const payload = {
      id: user.id,
      //We will pass User Role as well in payload
    };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "3h" },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({
          fullname,
          email,
          token,
        });
      }
    );
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
};

exports.getMe = async (req, res) => {
  const { id } = req.user;
  try {
    const { _id, email } = await User.findById(id);

    res.status(200).json({ _id, email });
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};
