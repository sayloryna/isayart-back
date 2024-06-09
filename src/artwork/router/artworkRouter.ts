import { Router } from "express";
import ArtworksController from "../controller/ArtworksController.js";

import Artwork from "../model/Artwork.js";
import ArtworksMongooseRepository from "../repository/ArtworksMongooseRepository.js";

const artworkRouter = Router();

const artworkRepository = new ArtworksMongooseRepository(Artwork);

const artworksController = new ArtworksController(artworkRepository);

artworkRouter.get("/", artworksController.getArtworks);
artworkRouter.post("/", artworksController.createArtwork);

export default artworkRouter;
