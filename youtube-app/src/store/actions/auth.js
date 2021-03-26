import YTService from '../../_service'
import {
  AUTH_LOADING,
  AUTH_SUCCESS,
  AUTH_ERROR
} from '../action-types'

const userData = new YTService()

const authLoading = () => ({ type: AUTH_LOADING })

const loginSuccess = payload => ({ type: AUTH_SUCCESS, payload })

const loginError = error => ({ type: AUTH_ERROR, payload: error })

export const login = loginData => {
  return dispatch => {
    dispatch(authLoading())
    userData
      .getItemUser(loginData)
      .then(res => {
        localStorage.setItem(
          'yta-user',
          JSON.stringify({ userId: res.id, token: res.token })
        )

        dispatch(loginSuccess({ id: res.id, token: res.token }))
      })
      .catch(error => dispatch(loginError(error.message)))
  }
}

export const logout = () => {
  return dispatch => {
    dispatch(authLoading())
    localStorage.removeItem('yta-user')
    dispatch(loginSuccess({ id: null, token: null }))
  }
}

export const isAuthenticated = () => {
  return dispatch => {
    dispatch(authLoading())
    const data = JSON.parse(localStorage.getItem('yta-user'))
    if (data) {
      dispatch(loginSuccess({ id: data.userId, token: data.token }))
    }
  }
}
