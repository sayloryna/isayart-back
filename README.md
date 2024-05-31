# Artworks API

## Description

This is an API REST for managing a collection of artworks. It allows you to perform CRUD operations (Create, Read, Update, Delete) on artworks.

## Installation

1. Clone the repository:

   - `git clone https://github.com/sayloryna/isayart-back.git`

2. Install the dependencies:

   - `npm install`

3. Configure the environment variables in a `.env` file with at least this variables

   - Server configuration

     `PORT=4444`
     (your choosen localhost port)

   - Database configuration

     `MONGODB_URI=mongodb+srv://<user>:<password>@mycluster.5ovuyy3.mongodb.net/isayart`
     (your MongoDB uri)

4. Start the server:
   - `npm start`

## Usage

The API is available at `http://localhost:4444` (or the port specified in your environment variables).

## Endpoints

### Get All Artworks

- **URL:** `http://localhost:4444/obras`
- **Method:** `GET`
- **Successful Response:**
  - List of artworks, each with:
    - `_id`: Artwork ID
    - `title`: Title of the artwork
    - `author`: Author of the artwork
    - `description`: Description of the artwork
    - `date`: Date of creation of the artwork
    - `artworkUrl`: URL of the artwork image
    - `size`: Object containing `width` and `height` of the artwork
    - `isFavourite`: Boolean indicating if the artwork is marked as favourite

## Errors

In case of errors, the API will return responses in the following format:

- **Error Response:**
  - `error`: Descriptive error message

## Contribution

If you wish to contribute to this project, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
