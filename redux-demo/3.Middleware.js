const redux = require("redux"); //redux library
const createStore = redux.createStore; //method
const combineReducers = redux.combineReducers;

// 1.Extend redux with custom functionality
// 2.Provides a third-party extension point between dispatching an action and the moment it reaches the reducer
// 3.use middleware for logging , crash reporting, performing asynchronous task EventSource.
//npm install redux-logger

const reduxLogger = require("redux-logger");
const logger = reduxLogger.createLogger();
const applyMiddleWare = redux.applyMiddleware;

//action
const BUY_CAKE = "BUY_CAKE";

function buyCake() {
  //action creator
  return {
    //action is an object with a type property
    type: BUY_CAKE,
    info: "first redux action",
  };
}

const BUY_IceCream = "BUY_IceCream";

function buyIceCream() {
  //action creator
  return {
    //action is an object with a type property
    type: BUY_IceCream,
  };
}

//Reducer-> update state based on the action

const cakeInitialState = {
  numOfCake: 10,
};
const iceCreamInitialState = {
  numOfIceCream: 20,
};
const cakeReducer = (state = cakeInitialState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state,
        numOfCake: state.numOfCake - 1,
      };
    default:
      return state;
  }
};
const iceCreamReducer = (state = iceCreamInitialState, action) => {
  switch (action.type) {
    case BUY_IceCream:
      return {
        ...state,
        numOfIceCream: state.numOfIceCream - 1,
      };
    default:
      return state;
  }
};

// redux store
// 1.Holds application in the state
// 2.Allows access to state via getState()
// 3.Allows state to be updated via dispatch(action)
// 4.register listeners via subscribe(listener)
// 5. unregistering of listeners via the function returned by subscribe(listener)
const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer,
});
const store = createStore(rootReducer, applyMiddleWare(logger));
console.log("initial state", store.getState());
const unsubscribe = store.subscribe(() => {});
store.dispatch(buyCake()); //dispatch(function)
store.dispatch(buyCake()); //dispatch(function)
store.dispatch(buyCake()); //dispatch(function)
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());
unsubscribe();
