import { Link } from 'react-router-dom'
import { Dropdown } from 'antd'
import { HeartTwoTone } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { showSaveFavorites } from '../../store/actions/search'
import './save-favorites.scss'

function SaveFavorites() {
  const dispatch = useDispatch()
  const {
    favorites: {
      showIcon,
      visibleTooltip
    }
  } = useSelector(state => state.search)

  const saveFavoritesHandler = () => {
    dispatch(showSaveFavorites('Сохранить запрос', true))
  }

  return (
    <Dropdown
      overlay={
        <div className="dropdown-wrapper">
          <p>Поиск сохранён в разделе «Избранное»</p>
          <Link to={'/favorites'}>Перейти в избранное</Link>
        </div>
      }
      placement="bottomCenter"
      visible={visibleTooltip}
      arrow
    >
      <HeartTwoTone
        twoToneColor="#1390E5"
        style={{display: showIcon ? 'inline-block' : 'none'}}
        onClick={saveFavoritesHandler}
        className="save-favorites"
      />
    </Dropdown>
  )
}

export default SaveFavorites