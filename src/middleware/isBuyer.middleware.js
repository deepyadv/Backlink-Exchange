export const isBuyer = (req, res, next) => {
    if (req.user.role !== "buyer") {
      return res.status(403).json({ msg: "Access denied: Not a buyer" });
    }
    next();
  };