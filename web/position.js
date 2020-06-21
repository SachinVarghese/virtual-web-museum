const updateLivePositions = function (posMap, selfID) {
  var positionEnv = document.querySelector("#positionEnv");
  positionEnv.innerHTML = "";
  Object.keys(posMap).forEach(function (visitor) {
    if (visitor != selfID) {
      var visitorEl = document.createElement("a-entity");
      visitorEl.setAttribute("gltf-model", "#visitor");
      visitorEl.setAttribute("scale", "1 1.3 1");
      var t = posMap[visitor];
      visitorEl.setAttribute("position", t[0] + " 0 " + t[2]);
      positionEnv.appendChild(visitorEl);
    }
  });
};

setInterval(function () {
  var cameraEl = document.querySelector("a-camera");
  var position = cameraEl.object3D.position.toArray();
  museumSocket.emit("position", position);
}, 3000);
