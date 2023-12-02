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
        await client.connect();

        //creating books collection in DATABASE

        const usersDataCollection = client.db("USER_DB").collection("users_data");

        // // Upload a book in the database
        // app.post('/upload-book', async (req, res) => {
        //     const data = req.body;
        //     const result = await booksCollection.insertMany(data);
        //     res.send(result)
        // })

        // Get All the userData from thi API
        app.get('/users', async (req, res) => {
            const result = await usersDataCollection.find().toArray();
            res.send(result);
        })

        app.get('/users/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id);
            const query = { _id: new ObjectId(id) };
            const result = await usersDataCollection.findOne(query);
            res.send(result);
        })


        // // Update Book Details
        // app.patch('/book-update/:id', async (req, res) => {
        //     const id = req.params.id;
        //     const updateBookDetails = req.body;
        //     const filter = { _id: new ObjectId(id) };

        //     const updateDoc = {
        //         $set: {
        //             ...updateBookDetails,
        //             rating: Math.random() * 5
        //         }
        //     }
        //     const result = await booksCollection.updateOne(filter, updateDoc);
        //     res.send(result)
        // })

        // // Delete a book from the database
        // app.delete('/book-delete/:id', async (req, res) => {
        //     const id = req.params.id;
        //     const query = { _id: new ObjectId(id) };
        //     const result = await booksCollection.deleteOne(query);
        //     res.send(result);
        // })

        // search by category
        // app.get('/all-books/:category', async (req, res) => {
        //     const category = req.params.category;
        //     const result = await booksCollection.find({ category: category }).toArray();
        //     res.send(result);
        // })
        // search by author
        // app.get('/all-books/:author', async (req, res) => {
        //     const author = req.params.author;
        //     const result = await booksCollection.find({ author: author }).toArray();
        //     res.send(result);
        // })
        // search by title

        // app.get('/all-books/:title', async (req, res) => {
        //     const title = req.params.title;
        //     const result = await booksCollection.find({ title: title }).toArray();
        //     res.send(result);
        // })

        // app.get('/all-books', async (req, res) => {
        //     let query = {};
        //     if (req.query?.genre) {
        //         query = { genre: req.query?.genre };
        //     }
        //     const result = await booksCollection.find(query).toArray();
        //     res.send(result);
        // })

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