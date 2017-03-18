const Promise = require('bluebird');

const dbStr = `
    const db = new Sequelize(process.env.DATABASE_URL);
    db.define('Sandcastles', {
      name: Sequelize.STRING
    });
    db.sync({force: true})
    .then(() => {
      server.listen(8080, () => {
        console.log("Database url", process.env.DATABASE_URL);
        console.log('Server is listening on port 8080');
      });
    });
`;

const serverStr = `
    server.on('request', (req, res) => {
      console.log(req.url);
      db.model('Sandcastles')
      .create({
        name: 'jems'
      })
      .then(() => {
        res.write('Hello')
        res.end();
      })
      .catch(console.error);
    });
`;

const npmScripts = `
    const Promise = require('bluebird');
    const exec = Promise.promisify(require('child_process').exec);
    exec('npm init -y')
    .then(() => {
      exec('npm install --save express');
    })
    .catch(console.error);
`;

const dockerFunc = (serverStr, dbStr) => {
    //child process spawn
    //does spawn need to be promisified? it is async but no callback
    const spawn = require('child_process').spawn;
    const exec = Promise.promisify(require('child_process').exec);

    //create user app folder
    const mkdir = spawn('mkdir', ['user-app']);

    //write npmScripts to user-app folder
    exec('touch user-app/npmScripts.js');
    .then(() => {

    })
    .then(() => {
        exec('node user-app/npmScripts.js');
    })
    .catch(console.error);
    //run npmScripts file

    //make connection to db
    // create db
    // serve up something from server

};

module.exports = {dockerFunc}
