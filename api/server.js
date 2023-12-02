import express from 'express';
import session from 'express-session';
import mongostore from 'connect-mongo';
import client from './dbclient.js';

const app = express();
// Apply express-session middleware to the whole application
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


app.listen(8080, () => {
  const currentDate = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Hong_Kong',
    hour12: false,
  });
  console.log(currentDate);
  console.log('Server started at http://127.0.0.1:8080');
});

