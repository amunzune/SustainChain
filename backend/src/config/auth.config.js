module.exports = {
  secret: process.env.JWT_SECRET || "sustainchain-secret-key",
  expiresIn: 86400 // 24 hours
};
