import express from 'express';
import { routes } from './routes';

const app = express();

// https methods - GET POST, PUT, PATCH, DELETE
// GET - search info
// POST - register info
// PUT - update an entity info / like a rout where you can update the email, name, password...
// PATCH - update unique information of an entity / do you want to receive the newsletter? yes or not?
// DELETE - delete an information

app.use(express.json()); // (middleware) express don't understand json, so I need to use this command for express search first a file in .json format



app.use(routes);

app.listen(3333, () => {
    console.log('HTTP SERVER IS RUNNING!');
});