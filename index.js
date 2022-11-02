const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const express = require('express');
const cors = require('cors');
const port = process.env.port || 5000
const app = express()
app.use(cors())
app.use(express.json())

// database connection start



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.l1pq8lk.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// crud operation of mongodb

async function run(){
try{
const databaseCollection = client.db('giniusUser').collection('services')

app.get('/services',async(req,res)=>{
    const query = {}
    const cursor = databaseCollection.find(query)
    const services = await cursor.toArray()
    res.send(services)
})

app.get('/services/:id', async (req, res) => {
    const id = req.params.id;
    const query = { _id: ObjectId(id) };
    const service = await databaseCollection.findOne(query);
    res.send(service);
});




} finally{


}
}

run().catch((err)=>console.error(err.message))



// Database connection end


app.get('/',(req,res)=>{
    res.send('server is running')
})




app.listen(port,()=>{
    console.log('listening to port',port)
})

