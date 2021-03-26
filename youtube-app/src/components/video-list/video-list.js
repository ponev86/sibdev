import { useState } from 'react'
import { Alert, Spin, Space } from 'antd'
import { UnorderedListOutlined, AppstoreOutlined } from '@ant-design/icons'
import VideoItem from '../video-item/video-item'
import { useSelector } from 'react-redux'
import './video-list.scss'

function VideoList() {
  const {
    items,
    loading,
    totalResults,
    preSearch,
    params: { q: queryString },
    error
  } = useSelector(state => state.search)

  const [view, setView] = useState('tile')

  const viewButtons = [
    { view: 'list', icon: <UnorderedListOutlined className="view__icon" /> },
    { view: 'tile', icon: <AppstoreOutlined className="view__icon" /> }
  ]

  return (
    <div className="container">
      {error && <Alert message={error} type="error" showIcon />}

      {!loading ? (
        <>
          {totalResults !== null && (
            <div className="list-option">
              <div className="list-option__info">
                Видео по запросу{' '}
                <strong>
                  «<span className="list-option__query">{queryString}</span>»
                </strong>
                <span className="list-option__count">{totalResults}</span>
              </div>
              <ul className="view">
                {viewButtons.map(item => {
                  const classes = ['view__check']
                  if (view === item.view) {
                    classes.push('view__check_active')
                  }
                  return (
                    <li className="view__item" key={item.view}>
                      <button
                        className={classes.join(' ')}
                        onClick={() => setView(item.view)}
                      >
                        {item.icon}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}
          {items && items.length > 0 ? (
            <div className={`video-wrapper video-wrapper_${view}`}>
              {items.map(itemVideo => (
                <VideoItem key={itemVideo.id} {...itemVideo} />
              ))}
            </div>
          ) : (
            !preSearch && (
              <Alert message={'Видео не найдены'} type="warning" showIcon />
            )
          )}
        </>
      ) : (
        <Space size="large">
          <Spin size="large" />
        </Space>
      )}
    </div>
  )
}

export default VideoList
