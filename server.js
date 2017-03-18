const pg = require('pg');
const retry = require('retry');
const http = require('http');
const server = http.createServer();
const Sequelize = require('sequelize');

var operation = retry.operation({retries:3});

operation.attempt(function() {
  const client = new pg.Client();
  client.connect((e) => {
    client.end();
    if(operation.retry(e)) {
      return;
    }
    if(!e) {
      console.log("Hello Postgres!");
    }

    // const db = new Sequelize(process.env.DATABASE_URL);

    // db.define('Sandcastles', {
    //   name: Sequelize.STRING
    // })

    // db.sync({force: true})
    // .then(() => {
    //   server.listen(8080, () => {
    //     console.log("Database url", process.env.DATABASE_URL);
    //     console.log('Server is listening on port 8080');
    //   });
    // })

    // server.on('request', (req, res) => {
    //   console.log(req.url);
    //   db.model('Sandcastles')
    //   .create({
    //     name: 'jems'
    //   })
    //   .then(() => {
    //     res.write('Hello')
    //     res.end();
    //   })
    //   .catch(console.error);
    // });
    var models = require('./models');
    var Promise = require('bluebird');

    server.on('request', require('./app'));

    models.db.sync({force: true})
        .then(function () {
            server.listen(8080, function () {
                console.log('Server is listening on port 8080!');
            });
        })
        .catch(console.error);
  })
})




