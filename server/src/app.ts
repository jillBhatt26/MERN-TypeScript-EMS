// Imports
// -----------------------------------------------

// import express
import express, { Application } from 'express';

// import mongoose
import { connect } from 'mongoose';

// import router
import router from './routes/APIRoutes';

// import cors
import cors from 'cors';

// import dotenv
import { config } from 'dotenv';

// INITs, CONFIGs and SETUP
// -----------------------------------------------

// environment variables config
// NOTE: Since we are using TypeScript we need to specify the path property in the object passed in config
config({ path: `${__dirname}/.env` });

// init express app
const app: Application = express();

// cors configuration
app.use(
    cors({
        origin: ['http://localhost:3000'],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type']
    })
);

// JSON data parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const dbURI: string = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@practice.tdza6.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

// mongodb connection with connect method from mongoose
connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(() => {
        // Connection successful : listen to app
        const PORT: number = Number(process.env.PORT) || 5000;

        app.listen(PORT, () => {
            console.log(`App listening on ${PORT}`);
        });
    })
    .catch((err: Error) => {
        // Display the connection error message
        console.log(`Error, connecting with the Database, MSG: ${err.message}`);
    });

// express middleware for routes
app.use('/', router);
