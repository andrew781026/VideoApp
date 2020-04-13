import {getReduxDispatch, getReduxState} from "../@createStore";

const ActionType = {
  SET_USER: '[USER] SET_USER',
};

const ActionCreator = {
  setUser(user) {
    return {
      type: ActionType.SET_USER,
      Data: user
    }
  },
};

const Selector = {
  getUser: (state) => state.User.user,
};

const initialState = {
  user: {
    name:'Andrew',
    role:'VIP'
  }
};

const Reducer = function (state = initialState, action) {
  switch (action.type) {
    case ActionType.SET_USER: {
      return {
        ...state,
        user: action.user,
      };
    }
    default: {
      return state;
    }
  }
};

const Transformer = {};

const AsyncMethods = {};

const ReduxUser = {ActionType, ActionCreator, Reducer, Selector, AsyncMethods};

export default ReduxUser;
