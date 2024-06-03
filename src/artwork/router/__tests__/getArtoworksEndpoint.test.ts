import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import connectToDataBase from "../../../database";
import Artwork from "../../model/Artwork";
import app from "../../../server/app/app";
import type ArtworkStructure from "../../types";

let mongoMemoryServer: MongoMemoryServer;
let serverUri: string;
beforeAll(async () => {
  mongoMemoryServer = await MongoMemoryServer.create();
  serverUri = mongoMemoryServer.getUri();

  await connectToDataBase(serverUri);
});
beforeEach(async () => {
  await Artwork.deleteMany();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoMemoryServer.stop();
});

describe("Given the GET /artworks endpoint", () => {
  const path = "/artworks";

  describe("When it receives a Request, and the data base has 'the mona Lisa'", () => {
    test("Then it should respond with 200 and  a list with 'La mona Lisa'", async () => {
      const monaLisa = {
        title: "the mona Lisa",
        author: "Leonardo da vinci",
        description: "",
        date: "2024",
        artworkUrl: "https://art.com/",
        size: {
          width: 40,
          height: 60,
        },
        isFavourite: false,
      };
      const vitruvisMan = {
        title: "vitruvis man",
        author: "Leonardo da vinci",
        description: "",
        date: "2024",
        artworkUrl: "https://art.com/",
        size: {
          height: 60,
          width: 40,
        },
        isFavourite: false,
      };

      const expectedStatusCode = 200;
      const expectedArtwork = {
        title: monaLisa.title,
      };

      await Artwork.create(monaLisa, vitruvisMan);

      const response = await request(app).get(path).expect(expectedStatusCode);

      const body = response.body as ArtworkStructure[];

      expect(body).toEqual(
        expect.arrayContaining([expect.objectContaining(expectedArtwork)]),
      );
    });
  });

  describe("When it receives a Request, and the data base fails", () => {
    test("Then it should respond wiht an error: 'Failed to find Artworks' ", async () => {
      await mongoose.disconnect();

      const expectedStatusCode = 500;
      const expectedErrorMessage = "Failed to find Artworks";

      const response = await request(app).get(path).expect(expectedStatusCode);

      const body = response.body as { error: string };

      expect(body.error).toBe(expectedErrorMessage);

      await mongoose.connect(serverUri);
    });
  });
});
