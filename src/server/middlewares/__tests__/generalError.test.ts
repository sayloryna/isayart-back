import { type NextFunction, type Request, type Response } from "express";
import { generalError } from "../generalError.js";
import ServerError from "../errors/ServerError/ServerError.js";
import { type ResponseWithStatusJson } from "../types";

describe("Given the generalError middleware", () => {
  const req = {};
  const res: ResponseWithStatusJson = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("When it receives a Response and  a 'Endpoint not found' error with the statusCode 404", () => {
    const error = new ServerError("Endpoint not found", 404);

    test("Then it should call the Response's status method with 404", () => {
      generalError(
        error,
        req as Request,
        res as Response,
        next as NextFunction,
      );

      expect(res.status).toHaveBeenCalledWith(error.statusCode);
    });

    test("Then it should call the Response's json method with 'error: Endpoint not found'", () => {
      generalError(
        error,
        req as Request,
        res as Response,
        next as NextFunction,
      );

      expect(res.json).toHaveBeenCalledWith({ error: error.message });
    });
  });

  describe("When it receives a Response without an error message and  without a statusCode", () => {
    const error = new Error();

    test("Then it should call the Response's status method with 500", () => {
      const expectedStatusCode = 500;

      generalError(error as ServerError, req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the Response's json method with 'Server failed: Unknown Error'", () => {
      const expectedMessage = "Server failed: Unknown Error";

      generalError(error as ServerError, req as Request, res as Response, next);

      expect(res.json).toHaveBeenCalledWith({
        error: expectedMessage,
      });
    });
  });
});
