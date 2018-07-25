const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const app = express();
const beers = require('./app/routes/beers');

app.use(express.urlencoded({extended: true}));
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/beers', {
    useNewUrlParser : true
});
mongoose.connection.on('connected', () => {
    console.log('connected')
});
mongoose.connection.on('error', (err) => {
    console.log('uh oh ' + err)
});

//Middleware
// app.use((req, res, next) => {
//     console.log("words words");
//     next();
// });
// app.use((req, res, next) => {
//     console.log("Other words");
//     next();
// });

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to our api, try hitting the /api endpoint' });
});

app.use('/api', router);

router.get('/', (req, res) => {
    res.json({ message: 'now checkout the /api/beers endpoint'})
});

router.use('/beers', beers);
//base/api/beers

const port = process.env.PORT || 8080;
app.listen(port);

console.log('listening on port 8080');