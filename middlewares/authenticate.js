const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized: Token missing" });
  
  try {
    const decoded = jwt.verify(token, SECRET_KEY, { expiresIn: '1d' });
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: "Forbidden: Invalid token" });
  }
};
module.exports = { authenticate };
