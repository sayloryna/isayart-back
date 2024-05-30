import { type NextFunction, type Request, type Response } from "express";
import { type ArtworksRepositoryStructure } from "../../repository/types";
import ArtworksController from "../ArtworksController";
import type ArtworkStructure from "../../types";
import ServerError from "../../../server/middlewares/errors/ServerError/ServerError";

describe("Given the getartworks method from artworksController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const req = {};
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next = jest.fn();

  describe("When it receives a Request and the repository contains the artwork 'La maja desnuda' by iker", () => {
    const artworks: ArtworkStructure[] = [
      {
        _id: "",
        title: "La maja desnuda",
        author: "iker",
        description: "",
        size: { width: 100, heigtht: 200 },
        date: "2024",
        artworkUrl: "",
        isFavourite: false,
      },
    ];

    const repository: ArtworksRepositoryStructure = {
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

    test("Then it should call the response json method with a list of artworks including 'La maja desnuda' by iker", async () => {
      await controller.getArtworks(
        req as Request,
        res as Response,
        next as NextFunction,
      );

      expect(res.json).toHaveBeenCalledWith(artworks);
    });
  });

  describe("When it receives a Next function and the repository throws an error with the message 'Failed to get artworks' ", () => {
    const repository: ArtworksRepositoryStructure = {
      async getAll(): Promise<ArtworkStructure[]> {
        throw new Error("Failed to get artworks");
      },
    };
    const controller = new ArtworksController(repository);

    test("Then it should call the next function with a server error with the code 404 and the message 'Failed to get artworks'", async () => {
      const expectedStatus = 404;
      const expectedMessage = "Failed to get artworks";

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
