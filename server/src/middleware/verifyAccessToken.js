import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, "secret", (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "token no valid" });
      }
      next();
    });
  } else {
    res.status(401).json({ message: "User must be verify" });
  }
};
