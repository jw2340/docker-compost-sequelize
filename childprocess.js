const spawn = require('child_process').spawn;
const ls = spawn('ls');

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
});

ls.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});

// const spawn = require('child_process').spawn;
// const mkdir = spawn('mkdir', ['app']);
// mkdir.stdout.on('data', (data) => {
//   console.log(`stdout: ${data}`);
// });

// mkdir.stderr.on('data', (data) => {
//   console.log(`stderr: ${data}`);
// });

// mkdir.on('close', (code) => {
//   console.log(`child process exited with code ${code}`);
// });
