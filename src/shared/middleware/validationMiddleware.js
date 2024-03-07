const emailValidationMiddleware = (req, res, next) => {
  const { email } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({
      status: 400,
      error: "Bad Request",
      message: "Invalid email format",
    });
  }

  next();
};

const phoneValidationMiddleware = (req, res, next) => {
  const { phone } = req.body;
  const phoneRegex = /^\d{10}$/;

  if (!phone || !phoneRegex.test(phone)) {
    return res.status(400).json({
      status: 400,
      error: "Bad Request",
      message: "Invalid phone number format",
    });
  }

  next();
};

module.exports = { emailValidationMiddleware, phoneValidationMiddleware };
