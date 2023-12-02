const express = require('express');
const server = require('./server');
import login from './login.js';
import movie from './movie.js';
import house from './house.js';
import moviesession from './moviesession.js';

const app = express();
app.use(
    session({
      secret: 'eie4432_group_project',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        // maxAge: 60 * 60 * 1000, // Set the idle timeout (60 minutes in this example)
        maxAge: 24 * 60 * 60 * 1000, // Set the idle timeout (60 minutes in this example)
      },
      store: mongostore.create({
        client,
        dbName: 'GoMdb',
        collectionName: 'session',
      }),
      rolling: true, // Reset the idle timeout on every request
    })
);
  
app.use('/api', server);
// Request handler for GET /
app.get('/', (req, res) => {
    res.redirect('/index.html');
});

app.use('/auth', login);
app.use('/movie', movie);
app.use('/house', house);
app.use('/moviesession', moviesession);

// Apply express.static middleware to the route "/"
app.use('/', express.static('static'));

  
module.exports = app;
