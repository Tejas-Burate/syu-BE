const jwt = require("jsonwebtoken");
async function verifyToken(req, res, next) {
  let token;
  let authHeader = req.headers.authorization;

  if (!authHeader) {
    res
      .status(401)
      .json({ status: 401, error: 401, message: "Bearer token is required" });
    return;
  }

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    console.log(token);
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      console.log("Decoded", decoded);
      req.user = decoded;
      next();
    } catch (err) {
      res
        .status(401)
        .json({ status: 401, error: 401, message: "User is not authorized" });
    }
  }
}

module.exports = verifyToken;
