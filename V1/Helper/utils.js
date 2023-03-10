const passRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const basicRegex = /^[a-zA-Z_]\w{2,20}$/;
const mobileRegex = /^[0-9]{10}$/;
const addRegex = /^.{5,}$/;

exports.passwordMatch = (password) => {
  return passRegex.test(password);
};

exports.emailMatch = (email) => {
  return emailRegex.test(email);
};

exports.basicMatch = (data) => {
  return basicRegex.test(data);
};

exports.mobileMatch = (number) => {
  return mobileRegex.test(number);
};

exports.addMatch = (address) => {
  return addRegex.test(address);
};
