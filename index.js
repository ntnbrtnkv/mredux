import { createStore, applyMiddleware, combineReducers } from "redux";

// function createStore(reducer, enhancer) {
//   let state;
//   let listeners = [];

//   if (typeof enhancer !== 'undefined') {
//     return enhancer(createStore)(reducer);
//   }
  
//   const getState = () => state;
  
//   const subscribe = (cb) => {
//     listeners.push(cb);
//     return () => {
//       const index = listeners.indexOf(cb);
//       listeners.splice(index, 1);
//     }
//   };
  
//   const dispatch = (action) => {
//     state = reducer(state, action);
//     listeners.forEach(cb => cb());
//   };
  
//   dispatch({type: '@@myredux/INIT'});
  
//   return {
//     getState,
//     subscribe,
//     dispatch
//   };
// }

// const applyMiddleware = (...middlewares) => {
//   return createStore => (...args) => {
//     const store = createStore(...args);

//     const middlewareAPI = {
//       getState: store.getState
//     };

//     const chain = middlewares.map(m => m(middlewareAPI));
//     const compose = (...funcs) => funcs.reduce((a, b) => (...args) => a(b(...args)));
//     const dispatch = compose(...chain)(store.dispatch);

//     return {
//       ...store,
//       dispatch
//     }
//   }
// }

const clicks = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
    case "DECREMENT":
      return state + 1;
    default:
      return state;
  }
};

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

const logger = store => next => action => {
  console.log('dispatching', action);
  const result = next(action);
  console.log('next state', store.getState());
  return result;
}
const rootStore = combineReducers({
  counter,
  clicks
});

const store = createStore(rootStore, applyMiddleware(logger));

const render = () => {
  document.getElementById("counter").innerText = store.getState().counter;
  document.getElementById("clicks").innerText = store.getState().clicks;
};

window.unsubscribe = store.subscribe(render);
render();

window.increment = () => {
  store.dispatch({ type: "INCREMENT" });
};

window.decrement = () => {
  store.dispatch({ type: "DECREMENT" });
};
