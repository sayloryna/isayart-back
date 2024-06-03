import { Router } from "express";
import ArtworksController from "../controller/ArtworksController.js";
import ArtworksMongooseRepository from "../repository/ArtworksRepository.js";
import Artwork from "../model/Artwork.js";

const artworkRouter = Router();

const artworkRepository = new ArtworksMongooseRepository(Artwork);

const artworksController = new ArtworksController(artworkRepository);

artworkRouter.get("/", artworksController.getArtworks);

export default artworkRouter;
