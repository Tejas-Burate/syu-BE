const generateOTP = () => {
  const characters = "0123456789"; // Characters to be used in the OTP
  const length = 6;
  let otp = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    otp += characters[randomIndex];
  }

  console.log(typeof otp);
  return otp;
};

module.exports = generateOTP;
