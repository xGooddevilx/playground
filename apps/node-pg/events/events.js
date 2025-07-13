// oxlint-disable no-unused-vars
import EventEmitter from "events";

const emitter = new EventEmitter();

emitter.on("newEvent", () => {
  console.log("New Event triggered");
});

emitter.emit("newEvent");

class customEventInstance extends EventEmitter {
  constructor() {
    super();
  }
}

const customEvent = new customEventInstance();
// bla bla bla
