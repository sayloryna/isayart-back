import { type NextFunction, type Request, type Response } from "express";
import { type ArtworksRepository } from "../../repository/types";
import ArtworksController from "../ArtworksController";
import ServerError from "../../../server/middlewares/errors/ServerError/ServerError";
import { type ResponseWithStatusJson } from "../types";
import type ArtworkStructure from "../../types";

describe("Given the getArtworks method from artworksController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const req = {};

  const res: ResponseWithStatusJson = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next = jest.fn();

  describe("When it receives a Request and the repository contains the artwork 'La maja desnuda'", () => {
    const artworks: ArtworkStructure[] = [
      {
        _id: "",
        title: "La maja desnuda",
        author: "iker",
        description: "",
        size: { width: 100, height: 200 },
        year: 2024,
        artworkUrl: "",
        isFavourite: false,
        medium: "oleo sobre lienzo",
        location: "Madrid, España",
      },
    ];

    const repository: ArtworksRepository = {
      async getAll(): Promise<ArtworkStructure[]> {
        return artworks;
      },
    };
    const controller = new ArtworksController(repository);

    test("Then it should call the Response status method with 200", async () => {
      const expectedStatus = 200;

      await controller.getArtworks(
        req as Request,
        res as Response,
        next as NextFunction,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should call the response json method with a list of artworks including 'La maja desnuda' ", async () => {
      await controller.getArtworks(
        req as Request,
        res as Response,
        next as NextFunction,
      );

      expect(res.json).toHaveBeenCalledWith(artworks);
    });
  });

  describe("When it receives a Next function and the repository throws an error ", () => {
    const repository: ArtworksRepository = {
      async getAll(): Promise<ArtworkStructure[]> {
        throw new Error();
      },
    };
    const controller = new ArtworksController(repository);

    test("Then it should call the next function with a server error with the code 404 and the message 'Failed to find artworks'", async () => {
      const expectedStatus = 404;
      const expectedMessage = "Failed to find Artworks";

      const error = new ServerError(expectedMessage, expectedStatus);

      await controller.getArtworks(
        req as Request,
        res as Response,
        next as NextFunction,
      );

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
