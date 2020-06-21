const maxChatCount = 5;
var chatCount = 0;

document.addEventListener(
  "keyup",
  (event) => {
    const keyName = event.code;

    if (keyName === "Space") {
      recognition.stop();
      recognition.start();
      console.log("Ready to receive a speech command.");
    }
    return;
  },
  false
);

const addToChat = function (text, isMine) {
  var chatTrail = document.querySelector("#chatTrail");
  if (chatCount > maxChatCount) {
    chatCount = 0;
    chatTrail.innerHTML = "";
    var chatEl = document.createElement("a-text");
    chatEl.setAttribute("value", "Chat");
    chatEl.setAttribute("align", "center");
    chatEl.setAttribute("color", "pink");
    chatEl.setAttribute("scale", "0.35 0.2 1");
    chatTrail.appendChild(chatEl);
  }
  ++chatCount;
  var chatEl = document.createElement("a-text");
  chatEl.setAttribute("value", text);
  chatEl.setAttribute("chat-id", chatCount);
  chatEl.setAttribute("height", "1");
  chatEl.setAttribute("color", isMine ? "white" : "gold");
  chatEl.setAttribute("align", isMine ? "left" : "right");
  chatEl.setAttribute("scale", "0.35 0.2 1");
  chatEl.setAttribute(
    "position",
    (isMine ? "-0.45 " : "0.45 ") + -0.1 * chatCount + "0"
  );
  chatTrail.appendChild(chatEl);
};
