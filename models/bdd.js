const { MongoClient, ServerApiVersion } = require('mongodb');

const mongoose = require('mongoose');

mongoose.connect(process.env.BDD_LINK, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    // Additional code for database operations can go here
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
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