var museumVisitors = 0;

var positionMap = {};

function setupSocket(io) {
  io.on("connection", (socket) => {
    ++museumVisitors;
    console.log("Total visitors", museumVisitors);
    io.emit("visitors", museumVisitors);

    socket.emit("message", "Welcome to virtual web museum");

    socket.on("position", (pos) => {
      positionMap[socket.id] = pos;
    });

    socket.on("chat", (msg) => {
      socket.broadcast.emit("chat", msg);
    });

    socket.on("disconnect", () => {
      --museumVisitors;
      console.log("Total visitors", museumVisitors);
      io.emit("visitors", museumVisitors);
      delete positionMap[socket.id];
      io.emit("position", positionMap);
    });
  });

  var posMapEvent = setInterval(function () {
    io.emit("position", positionMap);
  }, 5000);

  io.on("error", () => {
    clearInterval(posMapEvent);
  });
}

module.exports = {
  setupSocket: setupSocket,
};
