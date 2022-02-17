# F1api

Sample api to return basic information about Formula 1.

## Libraries

- [Express](https://expressjs.com/es/) -> Framewrok for Node js to create CRUD api's.
- [Mongoose](https://mongoosejs.com/) -> Library to manage data models based on schemas.
- [Nodemonn](https://www.npmjs.com/package/nodemon) -> Tool to restart Node application when saving file changes
- [body-parser](https://www.npmjs.com/package/body-parser) -> Middleware to parse request bodies

## Conection to Mongo DB

Instead of creating the DB locally, we can use Mongo DB Atlas. It is a free service to use and be able to create a DataBase in the cloud. On the other hand, we have Mongo DB, this is the batabase by itself, where we store all the information.

Steps to add Mongo to our project:

1. Install mongo in the project `npm install mongodb --save`.
   The flag --save is to install in the porject and updates the version in the package.json.

2. Get an instance of Mongo client `const MongoClient = require('mongodb').MongoClient`

3. Conect to the database .

```
MongoClient.connect('mongodb-connection-string', (err, client) => {
  // ... do something here
})
```

4. Create the project in Mongo DB Atlas.

5. Get the `mongodb-connection-string` that will help us to connect to the db in atlas.

## How to test CRUD operations

For this, I have used the extension REST Client for Visual Studio Code. With that extension you just have to create a new file called `whatEver.rest` and then, you can specify the different endpoints and check if it is working correctly.

Here is all the [documentation](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)

## Architecture

![image](https://user-images.githubusercontent.com/21090916/154352059-c39b4528-74c3-4ba6-b25d-a7535286af70.png)

- app.js -> Contains the connection to mongoose and all the configuration for the connection.
- routes -> Contains all the routes for our api. It will be diferentiated by collections.
- controller -> Conatins all the logic to resolve the different operations (Create, Read, Update, Delete)
- models -> Contains all the Schemas that it will be used for the different operations.

## Docu

Create a CRUD api with Express and Mongo

https://zellwk.com/blog/crud-express-mongodb/

All Mongo db operations

https://www.w3schools.com/nodejs/nodejs_mongodb_delete.asp
