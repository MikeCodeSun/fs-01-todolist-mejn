const asyncWrapper = (fr) => {
  return async (req, res, next) => {
    try {
      await fr(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

module.exports = asyncWrapper;
