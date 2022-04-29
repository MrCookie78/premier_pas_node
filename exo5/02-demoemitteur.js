const EventEmitter = require("events");
const emitter = new EventEmitter();

// enregistrer un écouteur (un listener)
emitter.on("messageReçu", function (eventArguments) {
  console.log(eventArguments);
});

emitter.emit("messageReçu", "ceci est une string");
emitter.emit("messageReçu", {id : 1, message : "Hey ca va"});