import { Request, Response } from "express";

export class AppError extends Error {
  status: number;
  error: string;
  code: string;
  helps: string;

  constructor(
    message: string,
    status: number,
    error: string,
    code: string,
    helps: string
  ) {
    super(message);
    this.status = status;
    this.error = error;
    this.code = code;
    this.message = message;
    this.helps = helps;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const AppErrorMiddleware = (err: any, req: Request, res: Response) => {
  const status = err.status || 500;

  res.status(status).json({
    success: false,
    status: status,
    code: err.code || "INTERNAL_ERROR",
    message: err.message,
    help: err.helps,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};
