const express = require("express");
const app = express();
const cluster = require("cluster");
const os = require("os");

function delay(duration) {
  const startTime = Date.now();
  while (Date.now() - startTime < duration) {
    // here where event loop blocked
    // when we call the different routes at the same time (any route on the server like / or /timer or /anything)
    // we face increase in time because event loop is still executing
    // so we have to use other threads that are present in the system
  }
}

app.get("/", (req, res) => {
  res.send(`Performance Example ${process.pid}`); // get id of current process in operating system
});

app.get("/timer", (req, res) => {
  delay(4000);
  res.send(`timer that takes time ${process.pid}`);
});

// code for all process are same

if (cluster.isMaster) {
  console.log("Master has been started");
  // this will only make two processes but what if we want more? see below
  //   cluster.fork(); // this create worker thread
  //   cluster.fork();
  // let use Os modules which gives info. of giving number of cores in our cpu
  // Use roundRobin for allocating processes
  const NUM_WORKERS = os.cpus().length;
  for (let i = 0; i < NUM_WORKERS; i++) {
    cluster.fork();
  }
} else {
  console.log("Worker has been started");
  app.listen(3000); // this runs after the master has been started and divided into the two threads
}
