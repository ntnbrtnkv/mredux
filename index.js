import { createStore } from "redux";

const counter = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
};

const store = createStore(counter);

const render = () => {
  document.getElementById("counter").innerText = store.getState();
};

window.unsubscribe = store.subscribe(render);
render();

window.increment = () => {
  store.dispatch({ type: "INCREMENT" });
};

window.decrement = () => {
  store.dispatch({ type: "DECREMENT" });
};
