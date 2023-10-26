const { MongoClient, ServerApiVersion } = require('mongodb');

const mongoose = require('mongoose');

const uri = "mongodb+srv://sly:slyuser@cluster0.zgftinn.mongodb.net/database?retryWrites=true&w=majority";

// const client = new MongoClient(uri, {
//     serverApi: {
//         version: ServerApiVersion.v1,
//         strict: true,
//         deprecationErrors: true,
//     }
// });



mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// async function run() {
//     try {
//         await client.connect();
//         await client.db("sly").command({ ping: 1 });
//         console.log("Pinged your deployment. You successfully connected to MongoDB!");
//     } catch (error) {
//         console.error("Error connecting to MongoDB:", error);
//     } finally {
//         await client.close();
//     }
// }

module.exports = mongoose;