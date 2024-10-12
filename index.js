const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://bootcamp_db_user:YsLPXpTh8E2KsKW5@cluster0.q1o0o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server (don't close the connection here)
    await client.connect();

    const userCollection = client.db("usersDbBootcamp").collection("users");

    app.post("/users", async (req, res) => {
      const user = req.body;
      //console.log(user);
      const insertedUser = await userCollection.insertOne(user);
      res.send(insertedUser);
    });

    // Ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Successfully connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Welcome to the express MongoDB CRUD server!");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
