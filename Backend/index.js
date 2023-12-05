const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
const app = express()
const cors = require('cors')
require('dotenv').config()
const port = process.env.PORT || 5000

// middleware
const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
}
app.use(cors(corsOptions))
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bf8rcw4.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


async function run() {
    try {
        const usersDataCollection = client.db("USER_DB").collection("users_data");
        const TeamCollection = client.db("USER_DB").collection("team_data");

        // add a user in the database
        app.post('/users', async (req, res) => {
            const data = req.body;
            const result = await usersDataCollection.insertOne(data);
            res.send(result)
        })

        // Get All the userData from thi API
        app.get('/users', async (req, res) => {
            const result = await usersDataCollection.find().toArray();
            res.send(result);
        })

        // Get All the specific user data from the API
        app.get('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await usersDataCollection.findOne(query);
            res.send(result);
        })


        // Update User Details
        app.put('/users/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const options = { upsert: true }
            const updateData = req.body;

            const updateDoc = {
                $set: {
                    first_name: updateData.first_name,
                    last_name: updateData.last_name,
                    email: updateData.email,
                    gender: updateData.gender,
                    avatar: updateData.avatar,
                    available: updateData.available,
                    domain: updateData.domain,
                }
            }
            const result = await usersDataCollection.updateOne(filter, updateDoc, options);
            res.send(result);
        })

        // Delete a user from the database
        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await usersDataCollection.deleteOne(query);
            res.send(result);
        })

        // SelectTeam

        app.get('/team', async (req, res) => {
            const result = await TeamCollection.find().toArray();
            res.send(result);
        })

        app.post('/team', async (req, res) => {
            const data = req.body;

            const existingTeamMember = await TeamCollection.findOne({ domain: data.domain });
            if (existingTeamMember) {
                return res.status(400).json({ error: 'Domain is not unique' });
            }

            // Check for availability
            if (!data.available) {
                return res.status(400).json({ error: 'Person is not available for selection' });
            }

            const result = await TeamCollection.insertOne(data);
            res.send(result)
        })

        await client.db("admin").command({ ping: 1 });

        console.log("Pinged your deployment. You successfully connected to MongoDB!");

    } finally { }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send(`Team Sync Server is running`)
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})