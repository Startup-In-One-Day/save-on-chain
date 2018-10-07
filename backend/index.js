const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const stripeApi = require('./api/stripe');
const putOnChainApi = require('./api/putOnChain');
const putOnEOS = require('./api/putOnEOS');
const path = require('path');
 
const pug = require('pug');

//initialize express
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Set middleware parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content-Type, Accept');
    next();
});


app.get("/", ((req, res) => {
    res.render("index"); // render the view file : views/index.pug
}));

app.use('/api', stripeApi);

app.use('/putOnChain', putOnChainApi);
app.use('/putOnEOS', putOnEOS);

app.listen(config.port, () => {
    console.log('Server started on port ' + config.port);
});