import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Alert } from 'antd'
import FavoriteItem from '../favorite-item/favorite-item'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getFavorites, removeFavorite, getSearchList, showSaveFavorites, searchSetParams } from '../../store/actions/search'
import './favorite-list.scss'

function FavoriteList() {
  const history = useHistory()
  const dispatch = useDispatch()
  const {
    favorites: { items }
  } = useSelector(state => state.search)
  const {
    user: { id: userId }
  } = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(getFavorites(userId))
  }, [dispatch, userId])

  const executeHandler = (q, order, maxResults) => {
    dispatch(getSearchList(q, order,maxResults))
    history.push('/')
  }

  const editHandler = params => {
    dispatch(searchSetParams(params))
    dispatch(showSaveFavorites('Изменить запрос', false))
  }

  const removeHandler = idx => {
    dispatch(removeFavorite(userId, idx))
  }

  return (
    <div className="container favorite-list">
      <h1 className="favorite-list__title">Избранное</h1>
      {
        items && items.length > 0 ?
          items.map((favorite, index) => {
            return (
              <FavoriteItem
                key={index}
                {...favorite}
                idx={index}
                execute={executeHandler}
                edit={editHandler}
                remove={removeHandler}
              />
            )
          })
        : <Alert message={'Вы еще не добавляли поиски в избранное'} type="warning" showIcon />
      }
    </div>
  )
}

export default FavoriteList
