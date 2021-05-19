//npm init --yes
//npm install redux

const redux = require("redux"); //redux library
const createStore = redux.createStore; //method

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

//Reducer-> update state based on the action

//(previousState, action)=> newSate

const initialState = {
  numOfCake: 10,
};

const reducer = (state = initialState, action) => {
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

// redux store
// 1.Holds application in the state
// 2.Allows access to state via getState()
// 3.Allows state to be updated via dispatch(action)
// 4.register listeners via subscribe(listener)
// 5. unregistering of listeners via the function returned by subscribe(listener)
const store = createStore(reducer);
console.log("initial state", store.getState());
const unsubscribe = store.subscribe(() =>
  console.log("Updated State", store.getState())
);
store.dispatch(buyCake()); //dispatch(function)
store.dispatch(buyCake()); //dispatch(function)
store.dispatch(buyCake()); //dispatch(function)
unsubscribe();
