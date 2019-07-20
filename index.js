// import { createStore } from "redux";

const createStore = (reducer) => {
  let state;
  let listeners = [];
  
  const getState = () => state;
  
  const subscribe = (cb) => {
    listeners.push(cb);
    return () => {
      const index = listeners.indexOf(cb);
      listeners.splice(index, 1);
    }
  };
  
  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(cb => cb());
  };
  
  dispatch({type: '@@myredux/INIT'});
  
  return {
    getState,
    subscribe,
    dispatch
  };
}

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
