import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import connectToDataBase from "../../../database";
import Artwork from "../../model/Artwork";
import app from "../../../server/app/app";
import type ArtworkStructure from "../../types";
import { type ArtworkData } from "../../repository/types";

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

const path = "/artworks";

const monaLisa: ArtworkData = {
  title: "the mona Lisa",
  author: "Leonardo da vinci",
  description: "",
  year: 2024,
  artworkUrl: "https://art.com/",
  size: {
    width: 40,
    height: 60,
  },
  location: "madrid",
  medium: "odio sobre lienzo",
};
describe("Given the GET /artworks endpoint", () => {
  describe("When it receives a Request, and the data base has 'the mona Lisa'", () => {
    test("Then it should respond with 200 and  a list with 'La mona Lisa'", async () => {
      const vitruvisMan: ArtworkData = {
        title: "vitruvis man",
        author: "Leonardo da vinci",
        description: "",
        year: 3333,
        artworkUrl: "https://art.com/",
        size: {
          height: 60,
          width: 40,
        },
        location: "venecia",
        medium: "lapiz sobre lienzo",
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
      await connectToDataBase("wrongUri");

      const expectedStatusCode = 500;
      const expectedErrorMessage = "Failed to find Artworks";

      const response = await request(app).get(path).expect(expectedStatusCode);

      const body = response.body as { error: string };

      expect(body.error).toBe(expectedErrorMessage);

      await mongoose.connect(serverUri);
    });
  });
});

describe("Given the POST /artworks endpoint", () => {
  describe("When it receives a Request with 'La mona lisa' data and 'la mona lisa' does not exist in the database", () => {
    test("then it should respond with 200 and La mona lisa with _Id", async () => {
      const expectedArtworkTitle = {
        title: monaLisa.title,
      };
      const response = await request(app).post(path).send(monaLisa).expect(200);

      const body = response.body as ArtworkStructure;

      expect(body).toHaveProperty("_id");
      expect(body).toEqual(expect.objectContaining(expectedArtworkTitle));
    });
  });

  describe("When it receives a Request with 'La mona lisa' data and 'la mona lisa' already exist in the database", () => {
    test("Then it should respond with 409 and error:'Artwork already in gallery'", async () => {
      await Artwork.create(monaLisa);
      const expectedErrorMessage = "Artwork already in gallery";

      const response = await request(app).post(path).send(monaLisa).expect(409);

      const body = response.body as ArtworkStructure;

      expect(body).toEqual({ error: expectedErrorMessage });
    });
  });

  describe("When it receives a Request with 'La mona lisa' but missing an artworkUrl", () => {
    test("Then it should respond with 400 and error:'Invalid or missing artwork data'", async () => {
      const monalisaWithoutArtworkUrl = {
        title: "la Mona Lisa",
        author: "Leonardo da vinci",
        description: "",
        year: 2024,
        size: {
          width: 40,
          height: 60,
        },
        location: "madrid",
        medium: "odio sobre lienzo",
      };
      const expectedErrorMessage = "Invalid or missing artwork data";

      const response = await request(app)
        .post(path)
        .send(monalisaWithoutArtworkUrl)
        .expect(400);

      const body = response.body as ArtworkStructure;

      expect(body).toEqual({ error: expectedErrorMessage });
    });
  });
});
