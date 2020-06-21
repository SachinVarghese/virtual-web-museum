AFRAME.registerComponent("connect-socket", {
  schema: { type: "string" },

  init: function () {
    var socket = io();
    socket.emit("message", this.data);
    socket.on("message", function (msg) {
      alert(msg);
    });
    socket.on("visitors", function (totalVisitors) {
      console.log("Total visitors", totalVisitors);
    });
  },
});
