const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const escape = require("escape-html");

const app = express();

app.use(express.static("website"));

const server = http.createServer(app);

const io = socketIo(server);

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("new message from client", ({ user, text }) => {
    const escapedText = escape(text);
    io.emit("server received a message", { user, text: escapedText });
  });
});

const port = process.env.PORT || 8080;
server.listen(port, () => console.log(`Listening on port ${port}`));
