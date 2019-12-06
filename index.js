console.log( process.env );
const express       = require('express');
const bodyParser    = require('body-parser');
const cookieParser  = require('cookie-parser');

const userRoutes    = require('./routes/user.route');
const authRoues     = require('./routes/auth.route');


const authMiddleware = require('./middlewares/auth.middleware');

const app = express();
const port = 3000;
app.set( 'views', './views' );
app.set( 'view engine', 'pug' );

app.use( bodyParser.json() ) // for parsing application/json
app.use( bodyParser.urlencoded({ extended: true }) ) // for parsing application/x-www-form-urlencoded
app.use( cookieParser('jfhdkjshfdsdasdqwecxz') );
app.use( express.static('public') );

app.use( '/users', authMiddleware.requireAuth, userRoutes );
app.use( '/auth', authRoues );

app.get( '/', function( request, response ) {
    // response.send('<h1> Test responsive </h1><a href="/users"> link </a>');
    response.render( 'index', { 
        title: 'Hey', 
        message: 'Hello there !' 
    });
});

app.listen( port, function() {
    console.log( 'Server is listening on port ' + port );
});