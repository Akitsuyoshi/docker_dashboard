import { SAMPLE_ACTION } from '../actions';

const initialState = {
  devices: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SAMPLE_ACTION: {
      return { ...state, token: action.token, open: action.open };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
