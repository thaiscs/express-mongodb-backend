const express = require('express')
const app = express()
const port = 4000
const { client } = require('./db');

app.use(express.json());

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
    
})
app.get("/listings", async (req, res, next) => {
    try {
        await client.connect();
        // Get the collection from the sample_airbnb database
        const collection = client.db('sample_airbnb').collection('listingsAndReviews');
        // Query 20 documents in the collection
        const listings = await collection.find({}).limit(20).toArray();
        // Send the listings as JSON response
        res.json(listings);
    } catch (error) {
        res.status(500).send(`Internal Server Error ${error}`);
    } finally {
        await client.close();
    }
});