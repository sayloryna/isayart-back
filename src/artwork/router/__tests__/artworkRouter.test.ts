import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import connectToDataBase from "../../../database";
import Artwork from "../../model/Artwork";
import app from "../../../server/app/app";
import type ArtworkStructure from "../../types";
import { type ArtworkData } from "../../repository/types";
import { type UpdateArtworkData } from "../../controller/types";

let mongoMemoryServer: MongoMemoryServer;
let serverUri: string;

beforeAll(async () => {
  mongoMemoryServer = await MongoMemoryServer.create();
  serverUri = mongoMemoryServer.getUri();

  await connectToDataBase(serverUri);
});

afterEach(async () => {
  await Artwork.deleteMany();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoMemoryServer.stop();
});

const path = "/artworks";

const monaLisaData: ArtworkData = {
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
  medium: "",
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
        title: monaLisaData.title,
      };

      await Artwork.create(monaLisaData, vitruvisMan);

      const response = await request(app).get(path).expect(expectedStatusCode);

      const body = response.body as { artworks: ArtworkStructure[] };

      expect(body.artworks).toEqual(
        expect.arrayContaining([expect.objectContaining(expectedArtwork)]),
      );
    });
  });
});

describe("Given the POST /artworks endpoint", () => {
  describe("When it receives a Request with 'La mona lisa' data and 'la mona lisa' does not exist in the database", () => {
    test("Then it should respond with 200 and La mona lisa with _Id and the title 'la mona lisa'", async () => {
      const expectedArtworkTitle = {
        title: monaLisaData.title,
      };
      const response = await request(app)
        .post(path)
        .send(monaLisaData)
        .expect(200);

      const body = response.body as { newArtwork: ArtworkStructure };

      expect(body.newArtwork).toHaveProperty("_id");
      expect(body.newArtwork).toEqual(
        expect.objectContaining(expectedArtworkTitle),
      );
    });
  });

  describe("When it receives a Request with 'La mona lisa' data and 'la mona lisa' already exist in the database", () => {
    test("Then it should respond with 409 and error:'Artwork already in gallery'", async () => {
      await Artwork.create(monaLisaData);
      const expectedErrorMessage = "Artwork already in gallery";

      const response = await request(app)
        .post(path)
        .send(monaLisaData)
        .expect(409);

      const body = response.body as { newArtwork: ArtworkStructure };

      expect(body).toEqual({ error: expectedErrorMessage });
    });
  });

  describe("When it receives a Request with 'La mona lisa' but missing an artworkUrl", () => {
    test("Then it should respond with 400 and error:'Invalid or missing artwork data'", async () => {
      const monalisaWithoutArtworkUrl: Omit<ArtworkData, "artworkUrl"> = {
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

describe("Given the Delete /artworks/:artworkId endpoint", () => {
  describe("When it receives a Request with  the mona lisa _id and the mona lisa Exist in the database", () => {
    test("Then it should respond with 200 and 'la mona lisa' with the same ID", async () => {
      const monaLisa = await Artwork.create<ArtworkData>(monaLisaData);
      const expectedId = monaLisa._id.toString();

      const response = await request(app)
        .delete(`${path}/${monaLisa._id}`)
        .expect(200);

      const body = response.body as { deletedArtwork: ArtworkStructure };

      const receivedId = body.deletedArtwork._id;

      expect(receivedId).toBe(expectedId);
    });
  });

  describe("When it receives a Request with andid that doesn't match any artwork Id ", () => {
    test("Then it should respond with 404 and the error 'Failed to delete, no artwork matched provided Id'", async () => {
      const notMatchingId = "48029431a150393675468875";
      const expectedError = `Failed to delete, no artwork matched provided Id`;

      const response = await request(app)
        .delete(`${path}/${notMatchingId}`)
        .expect(404);

      const body = response.body as { error: string };

      expect(body.error).toBe(expectedError);
    });
  });
});

describe("Given the GET /artworks/:artworkId endpoint", () => {
  describe("When it receives a Request with  the mona lisa _id and the mona lisa exist in the database", () => {
    test("Then it should respond with 200 and 'la mona lisa' with the same ID", async () => {
      const monaLisa = await Artwork.create<ArtworkData>(monaLisaData);
      const expectedId = monaLisa._id.toString();

      const response = await request(app)
        .get(`${path}/${monaLisa._id}`)
        .expect(200);

      const body = response.body as { artwork: ArtworkStructure };

      const receivedId = body.artwork._id;

      expect(receivedId).toBe(expectedId);
    });
  });

  describe("When it receives a Request with: and Id that doesn't match any artwork Id", () => {
    test("Then it should respond with 404 and the error 'Failed to delete, no artwork matched provided Id'", async () => {
      const notMatchingId = "67546887548029431a150393";
      const expectedError = `Failed to find artwork with provided Id`;
      const expectedCode = 404;

      const response = await request(app)
        .get(`${path}/${notMatchingId}`)
        .expect(expectedCode);

      const body = response.body as { error: string };

      expect(body.error).toBe(expectedError);
    });
  });
});

describe("Given the PUT /artworks endpoint", () => {
  describe("When it receives  Request with the 'monaLisaId' and isFavourite:true", () => {
    test("Then it should respond with  200 and the updatedArtworkd: monalisa with the property isFavourite:false", async () => {
      const monaLisa = (
        await Artwork.create<ArtworkData>(monaLisaData)
      ).toObject();

      const newIsFavouriteValue = true;
      const expectedStatus = 200;

      const artworkId = { _id: monaLisa._id.toString() };
      const update = { isFavourite: newIsFavouriteValue };

      const updatedMonalisa: ArtworkStructure = {
        ...monaLisa,
        _id: monaLisa._id.toString(),
        isFavourite: newIsFavouriteValue,
      };

      const requestBody: UpdateArtworkData = {
        artworkId,
        update,
      };

      const response = await request(app)
        .put(path)
        .send(requestBody)
        .expect(expectedStatus);

      const body = response.body as {
        updatedArtwork: ArtworkStructure;
      };

      expect(body.updatedArtwork).toEqual(updatedMonalisa);
    });
  });

  describe("When it receives  Request with the a wrong id and isFavourite:true", () => {
    test("then it should respond with  409 and the error: Failed to modify Artwork", async () => {
      const wrongId = "66645859515039348029431a";
      const newIsFavouriteValue = true;
      const expectedStatus = 409;
      const expectedError = "Failed to modify Artwork";

      const artworkId = { _id: wrongId };
      const update = { isFavourite: newIsFavouriteValue };

      const requestBody: UpdateArtworkData = {
        artworkId,
        update,
      };

      const response = await request(app)
        .put(path)
        .send(requestBody)
        .expect(expectedStatus);

      const body = response.body as {
        error: ArtworkStructure;
      };

      expect(body.error).toEqual(expectedError);
    });
  });
});
