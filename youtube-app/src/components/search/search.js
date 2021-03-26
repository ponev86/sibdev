import { useState, useEffect } from 'react'
import SaveFavorites from '../save-favorites/save-favorites'
import { Input } from 'antd'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getSearchList } from '../../store/actions/search'
import './search.scss'

function Search() {
  const { Search } = Input
  const dispatch = useDispatch()
  const {
    preSearch,
    params: {q}
  } = useSelector(state => state.search)

  const [searchStr, setSearchStr] = useState(q)
  const [submitValue, setSubmitValue] = useState('')

  useEffect(() => {
    if (submitValue.length > 0) {
      dispatch(getSearchList(submitValue, 'date', 12))
    }
  }, [submitValue, dispatch])

  const classes = ['container', 'search']
  if (preSearch) {
    classes.push('search_not-result')
  }

  const onSearchHandler = value => {
    setSubmitValue(value)
  }

  const onChangeHandler = e => {
    setSearchStr(e.target.value)
  }

  return (
    <div className={classes.join(' ')}>
      <div className="search__wrapper">
        <h1 className="search__title">Поиск видео</h1>
        {
          <Search
            placeholder="Что хотите посмотреть?"
            allowClear
            enterButton="Найти"
            onSearch={onSearchHandler}
            suffix={<SaveFavorites />}
            className="search__form"
            value={searchStr}
            onChange={onChangeHandler}
          />
        }
      </div>
    </div>
  )
}

export default Search
