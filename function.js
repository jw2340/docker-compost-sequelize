const Promise = require('bluebird');
const fs = require('fs');

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
    //child process exec
    const exec = Promise.promisify(require('child_process').exec);
    const writeFile = Promise.promisify(fs.writeFile);
    //create user app folder
    exec('mkdir user-app')
    .then(() => {
        //write npmScripts to user-app folder
        exec('touch user-app/npmScripts.js')
    })
    .then(() => {
        //write npmScripts string to npmScripts.js
        writeFile('user-app/npmScripts.js', npmScripts);
    })
    .then(() => {
        //run npmScripts file
        exec('node user-app/npmScripts.js');
    })
    .catch(console.error);

    //make connection to db
    // create db
    // serve up something from server

};

dockerFunc();
