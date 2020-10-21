const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();

app.use(express.static("website"));

const server = http.createServer(app);

const io = socketIo(server);

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("new message from client", (data) => {
    io.emit("server received a message", data);
  });
});

const port = process.env.PORT || 8080;
server.listen(port, () => console.log(`Listening on port ${port}`));
