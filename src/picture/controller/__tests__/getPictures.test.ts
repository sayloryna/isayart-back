import { type Request, type Response } from "express";
import { type PictureRepositoryStructure } from "../../repository/types";
import { type PictureStructure } from "../../types";
import PicturesController from "../PicturesController.js";

describe("Given the getPictures method from PicturesController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const req = {};
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  describe("When it receives a Request and the repository contains the picture 'La maja desnuda' by iker", () => {
    const pictures: PictureStructure[] = [
      {
        title: "La maja desnuda",
        author: "iker",
        description: "",
        size: { width: 100, heigtht: 200 },
        date: "2024",
        pictureUrl: "",
        isFavourite: false,
      },
    ];

    const repository: PictureRepositoryStructure = {
      async getAll(): Promise<PictureStructure[]> {
        return pictures;
      },
    };
    const controller = new PicturesController(repository);

    test("Then it should call the Response status method with 200", async () => {
      const expectedStatus = 200;

      await controller.getPictures(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should call the response json method with a list of pictures including 'La maja desnuda' by iker", async () => {
      await controller.getPictures(req as Request, res as Response);

      expect(res.json).toHaveBeenCalledWith({ pictures });
    });
  });

  describe("When it receives a Request and the repository throws an error ", () => {
    const repository: PictureRepositoryStructure = {
      async getAll(): Promise<PictureStructure[]> {
        throw new Error();
      },
    };
    const controller = new PicturesController(repository);

    test("Then it should call the Response status method with 404", async () => {
      const expectedStatus = 404;

      await controller.getPictures(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should call the response json method with error: 'Failed to get Pictures'", async () => {
      const expectedError = { error: "Failed to get Pictures" };

      await controller.getPictures(req as Request, res as Response);

      expect(res.json).toHaveBeenCalledWith(expectedError);
    });
  });
});
