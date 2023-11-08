<h1 align=center>
	Backend API TypeScript
</h1>

<p align=center>
	A basic RESTful API with authentication built with Node, Express, TypeScript & MongoDB.
</p>

<div align=center>
	<img src="https://img.shields.io/github/repo-size/grigorijtomczuk/backend-api-ts" alt="GitHub Repo Size">
	<img src="https://img.shields.io/github/license/grigorijtomczuk/backend-api-ts" alt="GitHub License Type">
</div>

## Getting Started

### Dependencies

Run this command in the project root to install all dependencies:

```
$ npm install
```

MongoDB is another dependency and requires either creating a cloud-based Atlas database or instantiating a local one using MongoDB Community Server.

### Configuration

Before starting the server, create `.env` file in the project root directory and populate it accroding to `example.env`:
```properties
# Port for API to use
PORT=8080

# MongoDB connection string
MONGO_URL=mongodb://127.0.0.1:27017/users

# Secret for updating HMAC content
SECRET=BACKEND-API-TS
```

### Building and Running

The following command will create an optimized production build of the application in the `build` folder:

```
$ npm run build
```

Make sure your **MongoDB database is up and running**, whether it's local or cloud-based. To run a local instance of MongoDB in the project root directory run this command:

```
$ mongod --dbpath ./db
```

To run the application in development mode on your localhost use this command:

```
$ npm start
```

## License

This project is built under the [MIT license](./LICENSE).
