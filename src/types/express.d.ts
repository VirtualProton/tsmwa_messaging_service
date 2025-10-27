import { Request } from "express";
console.log("✅ Custom Express types loaded!");  // Debugging line
declare module "express-serve-static-core" {
   interface Request {
    user: {
      userId: number;
      role: string;
      phone: string;
      ip?: string;
    };
  }
}

export { Request };
