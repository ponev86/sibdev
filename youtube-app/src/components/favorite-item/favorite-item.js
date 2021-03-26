import './favorite-item.scss'

function FavoriteItem({ idx, title, q, order, maxResults, execute, edit, remove }) {
  return (
    <div className="favorite-item">
      <div className="favorite-item__title">
        {title}
      </div>
      <ul className="events">
        <li className="events__item">
          <button
            className="events__btn events__btn_execute"
            onClick={() => execute(q, order, maxResults)}
          >
            Выполнить
          </button>
        </li>
        <li className="events__item">
          <button
            className="events__btn events__btn_edit"
            onClick={() => edit({q, order, maxResults, title, idx})}
          >
            Изменить
          </button>
        </li>
        <li className="events__item">
          <button
            className="events__btn events__btn_remove"
            onClick={() => remove(idx)}
          >
            Удалить
          </button>
        </li>
      </ul>
    </div>
  )
}

export default FavoriteItem
