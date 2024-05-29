import { type Request, type Response } from "express";
import { type ArtworksRepositoryStructure } from "../../repository/types";
import { type ArtworkStructure } from "../../types";
import ArtworksController from "../ArtworksController";

describe("Given the getartworks method from artworksController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const req = {};
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  describe("When it receives a Request and the repository contains the artwork 'La maja desnuda' by iker", () => {
    const artworks: ArtworkStructure[] = [
      {
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

      await controller.getArtworks(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should call the response json method with a list of artworks including 'La maja desnuda' by iker", async () => {
      await controller.getArtworks(req as Request, res as Response);

      expect(res.json).toHaveBeenCalledWith({ artworks });
    });
  });

  describe("When it receives a Request and the repository throws an error ", () => {
    const repository: ArtworksRepositoryStructure = {
      async getAll(): Promise<ArtworkStructure[]> {
        throw new Error();
      },
    };
    const controller = new ArtworksController(repository);

    test("Then it should call the Response status method with 404", async () => {
      const expectedStatus = 404;

      await controller.getArtworks(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should call the response json method with error: 'Failed to get artworks'", async () => {
      const expectedError = { error: "Failed to get artworks" };

      await controller.getArtworks(req as Request, res as Response);

      expect(res.json).toHaveBeenCalledWith(expectedError);
    });
  });
});
