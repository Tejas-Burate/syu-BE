const moment = require("moment-timezone");

const getCurrentDateTime = () => {
  try {
    const formattedDateTime = moment().format("YYYY-MM-DD HH:mm:ss.SSSSSSS");
    console.log(formattedDateTime);
    return formattedDateTime;
  } catch (error) {
    console.error("Error:", error);
    return null; // Return null or handle error appropriately
  }
};

module.exports = getCurrentDateTime;
