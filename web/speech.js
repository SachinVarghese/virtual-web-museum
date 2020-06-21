var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent =
  SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

var words = ["hello", "hi"];
var grammar =
  "#JSGF V1.0; grammar words; public <color> = " + words.join(" | ") + " ;";

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = "en-US";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

recognition.onresult = function (event) {
  var speech = event.results[0][0].transcript;
  if (speech) {
    museumSocket.emit("chat", speech);
    addToChat(speech, true);
  }
};

recognition.onspeechend = function () {
  recognition.stop();
};

recognition.onnomatch = function (event) {
  console.log("I didn't recognise that speech.");
};

recognition.onerror = function (event) {
  console.log("Error occurred in recognition: " + event.error);
};
