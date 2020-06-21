const express = require("express");
const path = require("path");
const app = express();
const port = 8000;
const http = require("http").createServer(app);
var io = require("socket.io")(http);
const setupSocket = require("./socket").setupSocket;

app.use(express.static(path.join(__dirname, "../web")));
app.get("/info", (req, res) => res.send("Virtual web museum is live!"));

setupSocket(io);

http.listen(port, () =>
  console.log(`Virtual web museum hosted at http://localhost:${port}`)
);
