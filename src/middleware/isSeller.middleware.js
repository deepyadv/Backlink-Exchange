


export const isSeller = async (req, res, next) => {
  if (req.user.role !== "seller") {
    return res.status(403).json({ msg: "Access denied: Not a seller" });
  }
  next();
};