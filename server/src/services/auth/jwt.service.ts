import jwt, { SignOptions } from "jsonwebtoken";

interface JwtPayload {
  id: string;
  role: "worker" | "eventTeam" | "admin";
}

class JWTService {
  private accessSecret =
    process.env.JWT_SECRET || "supersecretjwtkeychangeinproduction";

  private refreshSecret =
    process.env.JWT_REFRESH_SECRET ||
    "supersecretjwtrefreshkeychangeinproduction";

  private accessExpire =
    process.env.JWT_EXPIRE || "1d";

  private refreshExpire =
    process.env.JWT_REFRESH_EXPIRE || "7d";

  generateAccessToken(payload: JwtPayload): string {
    return jwt.sign(
      payload,
      this.accessSecret,
      {
        expiresIn: this.accessExpire,
      } as SignOptions
    );
  }

  generateRefreshToken(payload: JwtPayload): string {
    return jwt.sign(
      payload,
      this.refreshSecret,
      {
        expiresIn: this.refreshExpire,
      } as SignOptions
    );
  }

  generateTokens(payload: JwtPayload) {
    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload),
    };
  }

  verifyAccessToken(token: string): JwtPayload {
    return jwt.verify(token, this.accessSecret) as JwtPayload;
  }

  verifyRefreshToken(token: string): JwtPayload {
    return jwt.verify(token, this.refreshSecret) as JwtPayload;
  }
}

export default new JWTService();