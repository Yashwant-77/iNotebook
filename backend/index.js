
// Imports
import connectToMongo from './db.js';
import express from 'express';
import authRouter from './routes/auth.js';
import notesRouter from './routes/notes.js';
import cors from "cors"
import dotenv from 'dotenv'


dotenv.config();


const app = express();   // Initializes the Express Application instance
const port = process.env.PORT;    // Defining port where server will listen the requests

// Connecting to Mongodb
connectToMongo();

// Middleware function to enable parsing of  json in body of requests.
app.use(cors());
app.use(express.json());



//  Routtes
app.use('/api/auth', authRouter)
app.use('/api/notes', notesRouter)



// Listening here 
app.listen(port, () => {
    console.log(`iNotebook app listening on port http://localhost:${port}`)
})