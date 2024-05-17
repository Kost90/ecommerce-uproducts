import { Response, Request } from "express";

export default async function isPagination(
  req: Request,
  res: Response,
  next: any
) {
  const page: number = Number(req.query.page);
  const offset = (page - 1) * 6 || 0;
  req.params.page = offset.toString();
  next();
}
