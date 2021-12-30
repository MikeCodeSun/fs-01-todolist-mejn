const { CustomeError } = require("../error/customeError");

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomeError) {
    return res.status(err.errorStatus).json({ msg: err.message });
  }
  return res.status(500).json({ msg: "something went wrong" });
};

module.exports = errorHandler;
