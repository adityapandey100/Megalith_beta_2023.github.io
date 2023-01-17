const digits = "0123456789";
const alphabets = "abcdefghijklmnopqrstuvwxyz";
const upperCase = alphabets.toUpperCase();
const specialChar = "#!&@";

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

module.exports = {
  generate: function  (length, options) {
    length = length || 6;
    const createOptions = options || {};

    createOptions.digits = Object.prototype.hasOwnProperty.call(
      createOptions,
      "digits"
    )
      ? options.digits
      : true;
    createOptions.alphabets = Object.prototype.hasOwnProperty.call(
      createOptions,
      "alphabets"
    )
      ? options.alphabets
      : true;
    createOptions.upperCase = Object.prototype.hasOwnProperty.call(
      createOptions,
      "upperCase"
    )
      ? options.upperCase
      : true;
    createOptions.specialChar = Object.prototype.hasOwnProperty.call(
      createOptions,
      "specialChar"
    )
      ? options.specialChar
      : true;

    const allowedCharacters =
      ((createOptions.digits || "") && digits) +
      ((createOptions.alphabets || "") && alphabets) +
      ((createOptions.upperCase || "") && upperCase) +
      ((createOptions.specialChar || "") && specialChar);
    let otp = "";
    while (otp.length < length) {
      const index = randomNumber(0, allowedCharacters.length - 1);
      otp += allowedCharacters[index];
    }
    return otp;
  },
};