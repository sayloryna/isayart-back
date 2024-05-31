import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import connectToDataBase from "../../../database";
import Artwork from "../../model/Artwork";
import app from "../../../server/app/app";
import type ArtworkStructure from "../../types";
import { title } from "process";

let mongoMemoryServer: MongoMemoryServer;

beforeAll(async () => {
  mongoMemoryServer = await MongoMemoryServer.create();
  const serverUri = mongoMemoryServer.getUri();
  await connectToDataBase(serverUri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoMemoryServer.stop();
});
describe("Given the GET /artworks endpoint", () => {
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

      const path = "/artworks";

      const expectedStatusCode = 200;
      const expectedArtwork = {
        title: "the mona Lisa",
      };

      await Artwork.create(monaLisa, vitruvisMan);

      const response = await request(app).get(path).expect(expectedStatusCode);

      const body = response.body as ArtworkStructure[];

      expect(body).toEqual(
        expect.arrayContaining([expect.objectContaining(expectedArtwork)]),
      );
    });
  });
});
