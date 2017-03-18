const Promise = require('bluebird');
const exec = Promise.promisify(require('child_process').exec);
exec('npm init -y')
.then(() => {
  exec('npm install --save express');
})
.catch(console.error);
