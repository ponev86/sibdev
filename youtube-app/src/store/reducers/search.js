import {
  SEARCH_LOADING,
  SEARCH_SUCCESS,
  SEARCH_ERROR,
  SEARCH_SET_PARAMS,
  SHOW_SAVE_FAVORITES,
  HIDE_SAVE_FAVORITES,
  GET_FAVORITES,
  SEARCH_RESET,
  TOGGLE_TOOLTIP,
  EDIT_FAVORITE,
  REMOVE_FAVORITE
} from '../action-types'

const initialState = {
  params: {
    q: '',
    maxResults: 12,
    order: 'date',
    title: null,
    idx: null
  },
  loading: false,
  preSearch: true,
  favorites: {
    showIcon: false,
    visibleTooltip: false,
    showSaveFavorites: false,
    searchStrDisabled: true,
    titleForm: '',
    items: []
  },
  items: [],
  totalResults: null,
  error: null
}

export const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_LOADING:
      return {
        ...state,
        loading: true,
        preSearch: false,
        error: null
      }
    case SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload.items,
        totalResults: action.payload.totalResults,
        favorites: {
          ...state.favorites,
          showIcon: true
        }
      }
    case SEARCH_ERROR:
      return {
        ...state,
        items: [],
        totalResults: null,
        loading: false,
        error: action.payload
      }
    case SEARCH_SET_PARAMS:
      return {
        ...state,
        params: action.payload
      }
    case SEARCH_RESET:
      return {
        params: {
          q: '',
          maxResults: 12,
          order: 'date',
          title: null,
          idx: null
        },
        loading: false,
        preSearch: true,
        favorites: {
          showIcon: false,
          visibleTooltip: false,
          showSaveFavorites: false,
          searchStrDisabled: true,
          titleForm: '',
          items: []
        },
        items: [],
        totalResults: null,
        error: null
      }

    case SHOW_SAVE_FAVORITES:
      return {
        ...state,
        favorites: {
          ...state.favorites,
          showSaveFavorites: true,
          titleForm: action.payload.titleForm,
          searchStrDisabled: action.payload.searchStrDisabled
        }
      }
    case HIDE_SAVE_FAVORITES:
      return {
        ...state,
        favorites: {
          ...state.favorites,
          showSaveFavorites: false
        }
      }
    case TOGGLE_TOOLTIP:
      return {
        ...state,
        favorites: {
          ...state.favorites,
          visibleTooltip: action.payload
        }
      }
    case GET_FAVORITES:
      return {
        ...state,
        favorites: {
          ...state.favorites,
          items: action.payload
        }
      }
    case REMOVE_FAVORITE:
      return {
        ...state,
        favorites: {
          ...state.favorites,
          items: action.payload
        }
      }
    case EDIT_FAVORITE:
      return {
        ...state,
        favorites: {
          ...state.favorites,
          showSaveFavorites: false,
          items: action.payload
        }
      }
    default:
      return state
  }
}
