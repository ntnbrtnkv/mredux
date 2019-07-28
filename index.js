import { observable, autorun } from "mobx";

// mobx.js

let currentRunning;

function box(initial) {
  let value = initial;
  return {
    observers: [],
    get() {
      if (currentRunning) {
        currentRunning.observing.push(this);
      }
      return value;
    },
    set(v) {
      value = v;
      this.observers.splice(0).forEach(r => r.run());
    }
  }
}

function _autorun(cb) {
  const reaction = {
    observing: [],
    run() {
      currentRunning = this;
      this.observing = [];
      cb();
      this.observing.forEach(box => box.observers.push(this));
      currentRunning = undefined;

    }
  }
  reaction.run();
}

// index.js

const todo = observable({
  title: "Learn MobX",
  done: false,
})

function onTodoClick() {
  todo.done = !todo.done;
}

autorun(() => {
  document.getElementById("todo").innerHTML = `<h2 class=${
    todo.done ? "done" : "not_done"
  }>${todo.title}</h2>`;
});

document.getElementById("todo").addEventListener("click", onTodoClick);
