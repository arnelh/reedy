import merge from "lodash/merge";
import {
  RECEIVE_ALL_COLLECTIONS,
  RECEIVE_COLLECTION,
  REMOVE_COLLECTION,
} from "../actions/collection_actions";

const _initState = {
  all: null,
  current: null,
};

const collectionsReducer = (state = _initState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ALL_COLLECTIONS:
      return { ...state, all: action.collections };
    case RECEIVE_COLLECTION:
      const { collection } = action;
      return { ...state, all: { ...state.all, [collection.id]: collection } };
    case REMOVE_COLLECTION:
      const newState = merge({}, state);
      delete newState.all[action.collectionId];
      return newState;
    default:
      return state;
  }
};

export default collectionsReducer;
