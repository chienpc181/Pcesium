const express = require('express');
const cors = require('cors');
const { connectToDb, getDb } = require('./db');
const { MongoClient, ObjectId } = require('mongodb');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(cors());
let db;

// const port = process.env.PORT;
const port = 3000;
connectToDb((err) => {
    if (!err) {
        db = getDb();
        app.listen(3000, () => {
            console.log('app listening on port 3000');
        });
    }
})

app.get('/api/dummyData', async (req, res) => {
    const collection = db.collection('dummyDatas');

    const result = await collection.find({}).toArray();

    res.status(200).json(result);
});