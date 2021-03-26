import axios from 'axios'
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

const API_URL = `https://www.googleapis.com/youtube/v3/`

const searchLoading = () => ({ type: SEARCH_LOADING })

export const searchReset = () => ({ type: SEARCH_RESET })

const searchSuccess = payload => ({ type: SEARCH_SUCCESS, payload })

const searchError = error => ({ type: SEARCH_ERROR, payload: error })

export const searchSetParams = payload => ({ type: SEARCH_SET_PARAMS, payload })

export const getSearchList = (q, order, maxResults, title = null, idx = null) => {
  return dispatch => {
    dispatch(searchLoading())

    let list = {}
    let totalResults
    const params = { q, order, maxResults, title, idx }

    dispatch(searchSetParams(params))

    axios
      .get(`${API_URL}search?type=video&part=snippet&key=${process.env.REACT_APP_KEY}`, {
        params: { q, order, maxResults }
      })
      .then(({ data }) => {
        const videos = data.items
        const ids = videos.map(item => item.id.videoId).join(',') || ''
        list = [...videos]
        totalResults = data.pageInfo.totalResults

        return axios.get(
          `${API_URL}videos?part=statistics&key=${process.env.REACT_APP_KEY}`,
          { params: { id: ids } }
        )
      })
      .then(({ data: { items: stat } }) => {
        const payload = {}

        payload.totalResults = totalResults

        payload.items = list.map(itemVideo => {
          const result = {}
          result.id = itemVideo.id.videoId
          result.title = itemVideo.snippet.title
          result.channelTitle = itemVideo.snippet.channelTitle
          result.image = itemVideo.snippet.thumbnails.medium.url
          result.viewCount = stat.find(
            i => i.id === itemVideo.id.videoId
          ).statistics.viewCount

          return result
        })

        dispatch(searchSuccess(payload))
      })
      .catch(error => dispatch(searchError(error.message)))
  }
}

export const showSaveFavorites = (titleForm, searchStrDisabled) => {
  return { type: SHOW_SAVE_FAVORITES, payload: {titleForm, searchStrDisabled} }
}

export const hideSaveFavorites = () => ({type: HIDE_SAVE_FAVORITES})

export const saveFavorites = (userId, values) => {
  const userFavorites = JSON.parse(localStorage.getItem(`fav-${userId}`))
  let favorites = userFavorites ? [{...values}, ...userFavorites ] : [{...values}]

  localStorage.setItem(`fav-${userId}`, JSON.stringify(favorites))
  return { type: HIDE_SAVE_FAVORITES }
}

export const toggleTooltip = payload => ({ type: TOGGLE_TOOLTIP, payload })

export const getFavorites = userId => {
  const payload = JSON.parse(localStorage.getItem(`fav-${userId}`))
  return {type: GET_FAVORITES, payload}
}

export const removeFavorite = (userId, idx) => {
  const favorites = JSON.parse(localStorage.getItem(`fav-${userId}`))
  const filtered = favorites.filter((_, index) => index !== idx)

  localStorage.setItem(`fav-${userId}`, JSON.stringify(filtered))
  return { type: REMOVE_FAVORITE, payload: filtered }
}

export const saveFavoriteItem = (userId, values, idx)=> {
  const favorites = JSON.parse(localStorage.getItem(`fav-${userId}`))

  favorites[idx] = values
  localStorage.setItem(`fav-${userId}`, JSON.stringify(favorites))
  return { type: EDIT_FAVORITE, payload: favorites }
}