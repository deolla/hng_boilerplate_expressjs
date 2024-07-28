import {
  signUp,
  verifyOtp,
  login,
  changeUserRole,
  forgotPassword,
  resetPassword,
  changePassword,
  handleGoogleAuth,
} from "../controllers";
import { Router } from "express";
import { authMiddleware, checkPermissions } from "../middleware";
import { UserRole } from "../enums/userRoles";

const authRoute = Router();

authRoute.post("/auth/signup", signUp);
authRoute.post("/auth/verify-otp", verifyOtp);
authRoute.post("/auth/login", login);
authRoute.put(
  "/auth/organizations/:organization_id/users/:user_id/role",
  authMiddleware,
  checkPermissions([UserRole.SUPER_ADMIN, UserRole.ADMIN]),
  changeUserRole,
);

authRoute.post("/auth/google", handleGoogleAuth);

authRoute.post("/auth/forgot-password", forgotPassword);
authRoute.post("/auth/reset-password", resetPassword);
authRoute.patch("/auth/change-password", authMiddleware, changePassword);

export { authRoute };
