//middleware to check if users role is allowed 
const roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "bad role" });
    }
    next();
  };
};

module.exports = roleMiddleware;
