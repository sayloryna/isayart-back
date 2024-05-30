import { type NextFunction, type Request, type Response } from "express";
import ServerError from "../errors/ServerError/ServerError";
import notFoundError from "../notFoundError";

describe("Given the notFoundError middleware", () => {
  describe("When it receives a next function", () => {
    const req = {};
    const res = {};
    const next: NextFunction = jest.fn();

    beforeEach(() => {
      jest.resetAllMocks();
    });

    test("Then it should call it with a ServerError with the message: 'Endpoint not found'", () => {
      const expectedErrorMessage = "Endpoint not found";

      const error = new ServerError(expectedErrorMessage, 500);

      notFoundError(req as Request, res as Response, next);

      expect(error.message).toBe(expectedErrorMessage);
      expect(next).toHaveBeenCalledWith(error);
    });

    test("Then it should call it with a ServerError with the statusCode 404", () => {
      const expectedStatusCode = 404;

      const error = new ServerError("Endpoint not found", expectedStatusCode);

      notFoundError(req as Request, res as Response, next);
      expect(error.statusCode).toBe(expectedStatusCode);
      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
