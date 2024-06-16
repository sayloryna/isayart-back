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

- **PATH:** `/artworks`
- **Method:** `GET`
- **Successful Response:**

```json
[
  {
    "_id": "66572c92b1ee64ca1406557b",
    "title": "The mona Lisa",
    "author": "leonardo da Vinci",
    "description": "Portrait of Lisa, a woman smirking using the sfumatto technique",
    "date": "1503",
    "size": {
      "width": 40,
      "height": 60
    },
    "artworkUrl": "https:art.com/mona-lisa.jpg",
    "isFavourite": false,
    "location": "France",
    "medium": "Oil on poplar panel"
  }
]
```

## Create Artwork

- **PATH:** `/artworks`
- **Method:** `POST`
- **Request example:**

```json
{
  "title": "The mona Lisa",
  "author": "leonardo da Vinci",
  "description": "Portrait of Lisa, The Gioconda, a woman smirking using the sfumatto technique",
  "date": "1503",
  "size": {
    "width": 40,
    "height": 60
  },
  "artworkUrl": "https:art.com/mona-lisa.jpg",
  "location": "France",
  "medium": "Oil on poplar panel"
}
```

- **Successful Response:**

```json
{
  "createdArtwork": {
    "_id": "66572c92b1ee64ca1406557b",
    "title": "The mona Lisa",
    "author": "leonardo da Vinci",
    "description": "Portrait of Lisa, The Gioconda, a woman smirking using the sfumatto technique",
    "date": "1503",
    "size": {
      "width": 40,
      "height": 60
    },
    "artworkUrl": "https:art.com/mona-lisa.jpg",
    "location": "France",
    "medium": "Oil on poplar panel",
    "isFavourite": false
  }
}
```

## Delete Artwork by ID

- **PATH:** `/artworks/artworkId`
- **Method:** `DELETE`

- **Successful Response:**
  for artworkId:"66572c92b1ee64ca1406557b"

```json
{
  "deletedArtwork": {
    "_id": "66572c92b1ee64ca1406557b",
    "title": "The mona Lisa",
    "author": "leonardo da Vinci",
    "description": "Portrait of Lisa, The Gioconda, a woman smirking using the sfumatto technique",
    "date": "1503",
    "size": {
      "width": 40,
      "height": 60
    },
    "artworkUrl": "https:art.com/mona-lisa.jpg",
    "location": "France",
    "medium": "Oil on poplar panel",
    "isFavourite": false
  }
}
```

## Get Artwork by ID

- **PATH:** `/artworks/artworkId`
- **Method:** `GET`

- **Successful Response:**
  for artworkId:"66572c92b1ee64ca1406557b"

```json
{
  "deletedArtwork": {
    "_id": "66572c92b1ee64ca1406557b",
    "title": "The mona Lisa",
    "author": "leonardo da Vinci",
    "description": "Portrait of Lisa, The Gioconda, a woman smirking using the sfumatto technique",
    "date": "1503",
    "size": {
      "width": 40,
      "height": 60
    },
    "artworkUrl": "https:art.com/mona-lisa.jpg",
    "location": "France",
    "medium": "Oil on poplar panel",
    "isFavourite": false
  }
}
```

## Errors

In case of error, there's a GeneralError middleware that responds with following format:

- **Error Response:**

  ```json
  {
    "error": "error message"
  }
  ```

And the errors will be logged in console, with extended information in the following format:

- **Error in response:**

  - Responded with ERROR: (Received error)

- **Error in execution:**
  - Failed to (what failed): (error message)

## Contribution

If you wish to contribute to this project, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
