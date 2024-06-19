import { type NextFunction, type Request, type Response } from "express";
import {
  type ArtworkData,
  type ArtworksRepository,
} from "../../repository/types";
import ArtworksController from "../ArtworksController";
import ServerError from "../../../server/middlewares/errors/ServerError/ServerError";
import {
  type RequestWithArtworkIdParameter,
  type RequestWithArtworkData,
  type RequestWithUpdateArtworkData,
  type ResponseWithStatusJson,
} from "../types";
import type ArtworkStructure from "../../types";

const res: ResponseWithStatusJson = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};
const next = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

const majaDesnuda: ArtworkStructure = {
  _id: "majaDesnudaId",
  title: "La maja desnuda",
  author: "iker",
  description: "",
  size: { width: 100, height: 200 },
  year: 2024,
  artworkUrl: "",
  isFavourite: false,
  medium: "oleo sobre lienzo",
  location: "Madrid, España",
};

const artworks: ArtworkStructure[] = [majaDesnuda];

const errorRepository: ArtworksRepository = {
  async getAll(): Promise<ArtworkStructure[]> {
    throw new Error();
  },
  async createArtwork(_artworkData: ArtworkData): Promise<ArtworkStructure> {
    throw new Error();
  },
  async deleteById(artworkId) {
    throw new Error(`Could not find artwork with ID: ${artworkId}`);
  },
  async getById(artworkId: string): Promise<ArtworkStructure | Error> {
    throw new Error(`Could not find artwork with ID: ${artworkId}`);
  },
  async updateArtwork(
    _artworkId: string,
    _modificaton: Partial<ArtworkStructure>,
  ): Promise<ArtworkStructure> {
    throw new Error("Function not implemented.");
  },
};

const repository: ArtworksRepository = {
  async getAll(): Promise<ArtworkStructure[]> {
    return artworks;
  },
  async createArtwork(artworkData: ArtworkData): Promise<ArtworkStructure> {
    return { ...artworkData, _id: majaDesnuda._id, isFavourite: false };
  },
  async deleteById(artworkId) {
    const majaDesnuda = artworks.find((artwork) => artwork._id === artworkId);
    if (majaDesnuda) {
      return majaDesnuda;
    }

    throw new Error(`Could not find artwork with ID: ${artworkId}`);
  },
  async getById(artworkId) {
    const majaDesnuda = artworks.find((artwork) => artwork._id === artworkId);
    if (majaDesnuda) {
      return majaDesnuda;
    }

    throw new Error(`Could not find artwork with ID: ${artworkId}`);
  },

  async updateArtwork(
    artworkId: string,
    modificaton: Partial<ArtworkStructure>,
  ): Promise<ArtworkStructure> {
    artworks.map((artwork) => {
      if (artwork._id === artworkId) {
        const updatedArtwork = Object.assign(artwork, modificaton);
        return updatedArtwork;
      }

      return artwork;
    });
    return majaDesnuda;
  },
};

describe("Given the getArtworks method from the artworksController", () => {
  const req = {};

  describe("When it receives a Request and the repository contains the artwork 'La maja desnuda'", () => {
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

      expect(res.json).toHaveBeenCalledWith({ artworks });
    });
  });

  describe("When it receives a Next function and the repository throws an error ", () => {
    const controller = new ArtworksController(errorRepository);

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

describe("Given the createArtwork method from the artworksController", () => {
  describe("When it receives a Request with the 'la maja desnuda' data", () => {
    const majaDesnudaData: ArtworkData = {
      title: "La maja desnuda",
      author: "iker",
      description: "",
      size: { width: 100, height: 200 },
      year: 2024,
      artworkUrl: "",
      medium: "oleo sobre lienzo",
      location: "Madrid, España",
    };

    const req: Partial<RequestWithArtworkData> = { body: majaDesnudaData };

    const controller = new ArtworksController(repository);

    test("Then it should call the response json method with 'la maja desnuda' with _id", async () => {
      await controller.createArtwork(
        req as RequestWithArtworkData,
        res as Response,
        next as NextFunction,
      );

      expect(res.json).toHaveBeenCalledWith({ newArtwork: majaDesnuda });
    });

    test("Then it should call the response status method with 200", async () => {
      const expectedStatusCode = 200;

      await controller.createArtwork(
        req as RequestWithArtworkData,
        res as Response,
        next as NextFunction,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });
  });

  describe("When it receives a Request with the 'la maja desnuda' and the repository throws an error", () => {
    const majaDesnudaData = {
      title: "La maja desnuda",
      author: "iker",
      description: "",
      size: { width: 100, height: 200 },
      year: 2024,
      artworkUrl: "",
      medium: "oleo sobre lienzo",
      location: "Madrid, España",
    };

    const req: Partial<RequestWithArtworkData> = { body: majaDesnudaData };

    const controller = new ArtworksController(errorRepository);

    test("Then it should call next funtion with error:Invalid or missing artwork data with the code 400", async () => {
      await controller.createArtwork(
        req as RequestWithArtworkData,
        res as Response,
        next as NextFunction,
      );
      const error = new ServerError("Invalid or missing artwork data", 400);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});

describe("Given the deleteArtworkById method from the artworksController", () => {
  describe("When it receives de ID: 'majaDesnudaId'", () => {
    describe("And 'la maja desnuda' with that id is in the database", () => {
      const req: Partial<RequestWithArtworkIdParameter> = {
        params: {
          artworkId: majaDesnuda._id,
        },
      };

      test("Then it should call the response status with 200 and the json with 'la maja desnuda'", async () => {
        const expectedCode = 200;
        const controller = new ArtworksController(repository);

        await controller.deleteArtworkById(
          req as RequestWithArtworkIdParameter,
          res as Response,
          next as NextFunction,
        );

        expect(res.status).toHaveBeenCalledWith(expectedCode);
        expect(res.json).toHaveBeenCalledWith({ deletedArtwork: majaDesnuda });
      });

      test("Then it should call the next function with 404 and error:'Could not find artwork with ID: majaDesnudaID'", async () => {
        const expectedError = new ServerError(
          "Failed to delete, no artwork matched provided Id",
          404,
        );

        const controller = new ArtworksController(errorRepository);
        await controller.deleteArtworkById(
          req as RequestWithArtworkIdParameter,
          res as Response,
          next as NextFunction,
        );
        expect(next).toHaveBeenCalledWith(expectedError);
      });
    });
  });
});

describe("Given the getArtworkById method from the artworksController", () => {
  describe("When it receives de ID: 'majaDesnudaId'", () => {
    describe("And 'la maja desnuda' with that id is in the database", () => {
      const req: Partial<RequestWithArtworkIdParameter> = {
        params: {
          artworkId: majaDesnuda._id,
        },
      };

      test("Then it should call the response status with 200 and the json with 'la maja desnuda'", async () => {
        const expectedCode = 200;
        const controller = new ArtworksController(repository);

        await controller.getArtworkById(
          req as RequestWithArtworkIdParameter,
          res as Response,
          next as NextFunction,
        );

        expect(res.status).toHaveBeenCalledWith(expectedCode);
        expect(res.json).toHaveBeenCalledWith({ artwork: majaDesnuda });
      });

      test("Then it should call the next function with 404 and error:'Could not find artwork with ID: majaDesnudaID'", async () => {
        const expectedError = new ServerError(
          "Failed to find artwork with provided Id",
          404,
        );

        const controller = new ArtworksController(errorRepository);
        await controller.getArtworkById(
          req as RequestWithArtworkIdParameter,
          res as Response,
          next as NextFunction,
        );
        expect(next).toHaveBeenCalledWith(expectedError);
      });
    });
  });
});

describe("Given the updateArtwork method from the artworksController", () => {
  describe("When it receives a Request with the id:'majaDesnudaId' and the modification with title: 'la maja vestida' ", () => {
    const newTitle = "la maja vestidoa";
    const req: Partial<RequestWithUpdateArtworkData> = {
      body: {
        _id: majaDesnuda._id,
        update: { title: newTitle },
      },
    };

    const controller = new ArtworksController(repository);

    test("Then it should call the response json method with 'la maja vestida' and status 200 ", async () => {
      const expectedStatusCode = 200;
      const majaVestida = {
        ...majaDesnuda,
        title: newTitle,
      };

      await controller.updateArtwork(
        req as RequestWithUpdateArtworkData,
        res as Response,
        next as NextFunction,
      );

      expect(res.json).toHaveBeenCalledWith({ updatedArtwork: majaVestida });
      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });
  });

  describe("When it receives a Request with the 'majaDesnudaId' and year 2022 and the repository throws an error", () => {
    const newYear = 2024;

    const req: Partial<RequestWithUpdateArtworkData> = {
      body: {
        _id: majaDesnuda._id,
        update: { year: newYear },
      },
    };

    const controller = new ArtworksController(errorRepository);

    test("Then it should call next funtion with error:Failed to modify Artwork with the code 409", async () => {
      const expectedStatus = 409;
      const expectedErrorMessage = "Failed to modify Artwork";

      await controller.updateArtwork(
        req as RequestWithUpdateArtworkData,
        res as Response,
        next as NextFunction,
      );
      const error = new ServerError(expectedErrorMessage, expectedStatus);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
