const jwt = require("jsonwebtoken");

// middleware to check if user is log in
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  //check if there is token in header
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token access denied" });
  }

  const token = authHeader.split(" ")[1];

  try {
    //verify the token and add user data to request
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "invalid token" });
  }
};

module.exports = authMiddleware;
