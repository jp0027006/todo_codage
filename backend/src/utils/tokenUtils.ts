// src/utils/tokenUtils.ts
import jwt, { JwtPayload } from 'jsonwebtoken';

interface MyJwtPayload extends JwtPayload {
  userId: string;
}

// Function to verify the token
export const verifyToken = (authorizationHeader: string): MyJwtPayload | null => {
  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    return null;
  }

  const token = authorizationHeader.replace("Bearer ", "");

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);
    return decodedToken as MyJwtPayload;
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      console.error("Invalid or expired token", err);
    } else if (err instanceof jwt.TokenExpiredError) {
      console.error("Token has expired");
    } else {
      console.error("Unknown error during token verification");
    }
    return null;
  }
};
