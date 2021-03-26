import {
  AUTH_LOADING,
  AUTH_SUCCESS,
  AUTH_ERROR
} from '../action-types'

const initialState = {
  user: {
    id: null,
    token: null
  },
  error: null,
  loading: false
}

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_LOADING:
      return {
        ...state,
        loading: true
      }
    case AUTH_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: null,
        loading: false
      }
    case AUTH_ERROR:
      return {
        ...state,
        user: {
          id: null,
          token: null
        },
        loading: false,
        error: action.payload
      }
    default:
      return state
  }
}
