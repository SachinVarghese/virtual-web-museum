AFRAME.registerComponent("connect-socket", {
  schema: { type: "string" },

  init: function () {
    museumSocket.emit("message", this.data);
    var position = this.el.camera.el.object3D.position.toArray();
    museumSocket.emit("position", position);

    museumSocket.on("message", function (msg) {
      console.log(msg);
    });
    museumSocket.on("chat", function (msg) {
      console.log(msg);
      addToChat(msg, false);
    });

    museumSocket.on("position", function (posMap) {
      updateLivePositions(posMap, museumSocket.id);
    });

    museumSocket.on("visitors", function (totalVisitors) {
      var visitorNumber = document.querySelector("#visitorNumber");
      visitorNumber.setAttribute("value", "Total visitors : " + totalVisitors);
      console.log("Total visitors", totalVisitors);
    });
    museumSocket.on("error", (error) => {
      console.error(error);
    });
  },
});
