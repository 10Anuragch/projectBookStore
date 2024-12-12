import { Router } from "express";
import { verify } from "jsonwebtoken";

const router = Router();

// Token validation endpoint
router.post("/user/validate-token", (req, res) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Extract token
  if (!token) {
    return res.status(401).json({ message: "No token provided." });
  }

  try {
    const decoded = verify(token, process.env.JWT_SECRET); // Verify token
    res.status(200).json({ user: decoded });
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token." });
  }
});

export default router;
