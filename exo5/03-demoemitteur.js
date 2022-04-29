/*
	POURQUOI NE PAS JUSTE FAIRE CA??
*/

const EventEmitter = require("events");
const emitter = new EventEmitter();

const logArgs = function(eventArguments){
	console.log(eventArguments)
}

logArgs("ceci est une string");
logArgs({id : 1, message : "Hey ca va"});