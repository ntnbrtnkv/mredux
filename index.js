import { observable, autorun } from "mobx";
const box = observable.box;

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
