var http = require('http');
var server = http.createServer();
var Sequelize = require('sequelize');
var db = new Sequelize(process.env.DATABASE_URL);

db.define('Sandcastles', {
  name: Sequelize.STRING
})

db.sync({force: true})
.then(() => {
  server.listen(8080, () => {
    console.log(process.env.DATABASE_URL);
    console.log('Server is listening');
  });
})

server.on('request', (req, res) => {
  console.log(req.url);
  db.model('Sandcastles').create({
    name: 'jems'
  })
  .then(() => {
    res.write('Hello')
    res.end();
  })
  .catch(console.error);
});
// var models = require('./models');
// var Promise = require('bluebird');

// server.on('request', require('./app'));

// models.db.sync({force: true})
//     .then(function () {
//         server.listen(3001, function () {
//             console.log('Server is listening on port 3001!');
//         });
//     })
//     .catch(console.error);

