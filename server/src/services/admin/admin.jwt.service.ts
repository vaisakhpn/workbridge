import jwt, { SignOptions } from "jsonwebtoken";

class AdminJwtService {
  generateToken() {
    return jwt.sign({ role: "ADMIN" }, process.env.JWT_ADMIN_SECRET as string, {
      expiresIn: (process.env.JWT_ADMIN_EXPIRES_IN ||
        "7d") as SignOptions["expiresIn"],
    });
  }

  verifyToken(token: string) {
    return jwt.verify(token, process.env.JWT_ADMIN_SECRET!);
  }
}

export default new AdminJwtService();
