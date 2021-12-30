class CustomeError extends Error {
  constructor(message, errorStatus) {
    super(message);
    this.errorStatus = errorStatus;
  }
}

const createError = (msg, errorStatus) => {
  return new CustomeError(msg, errorStatus);
};

module.exports = { createError, CustomeError };
