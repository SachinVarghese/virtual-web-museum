var museumVisitors = 0;

function setupSocket(io) {
  io.on("connection", (socket) => {
    ++museumVisitors;
    console.log("a new visitor entered");
    io.emit("visitors", museumVisitors);
    socket.emit("message", "Welcome to virtual web museum");
    socket.on("message", (msg) => {
      console.log("message: " + msg);
    });
    socket.on("disconnect", () => {
      --museumVisitors;
      console.log("visitor left");
    });
  });
}

module.exports = {
  setupSocket: setupSocket,
};
