const express = require('express');
const cors = require('cors');
const app = express()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const port = process.env.PORT || 5000

// middleware

app.use(cors())
app.use(express.json())


// GET OPARATION FOR SERVER

app.get('/', (req, res) => {
    res.send('booking server')
})



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.h3zxwhp.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const hotelRoomcollection = client.db('Thalia-hotel').collection('rooms')
        // all rooms data get
        app.get('/rooms', async(req, res)=>{
            const query = {}
            const cursor = hotelRoomcollection.find(query)
            const rooms = await cursor.toArray()
            res.send(rooms)
        })

        // single rooms data get

        app.get('/rooms/:id', async(req, res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)}
            const room = await hotelRoomcollection.findOne(query)
            res.send(room)
        })


    }
    finally {

    }
}
run()
app.listen(port, () => {
    console.log(`Hotel booking server is running on port ${port}`);
})
