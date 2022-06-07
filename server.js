const express = require("express");
const app = express();

function delay(duration) {
  const startTime = Date.now();
  while (Date.now() - startTime < duration) {
    // here where event loop blocked
    // when we call the different routes at the same time
    // we face increase in time because event loop is still executing
    // so we have to use other threads that are present in the system
  }
}

app.get("/", (req, res) => {
  res.send("Performance Example");
});

app.get("/timer", (req, res) => {
  delay(4000);
  res.send("timer that takes time");
});

app.listen(3000);
