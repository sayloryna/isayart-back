import { type Response } from "express";

export type ResponseWithStatusJson = Pick<Response, "status" | "json">;
