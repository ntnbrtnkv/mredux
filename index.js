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

function autorun(cb) {
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

const todo = box("Learn MobX");
const done = box(false);

function onTodoClick() {
  done.set(!done.get());
}

autorun(() => {
  document.getElementById("todo").innerHTML = `<h2 class=${
    done.get() ? "done" : "not_done"
  }>${todo.get()}</h2>`;
});

document.getElementById("todo").addEventListener("click", onTodoClick);
