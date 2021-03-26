import './video-item.scss'

function VideoItem({ id, title, channelTitle, image, viewCount }) {
  return (
    <div className="video-item">
      <div className="video-item__poster">
        <img src={image} alt="" />
      </div>
      <div className="video-item__description">
        <a
          className="video-item__title"
          href={`https://youtu.be/${id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {title}
        </a>
        <p className="video-item__channel">{channelTitle}</p>
        <p className="video-item__views">{viewCount} просмотров</p>
      </div>
    </div>
  )
}

export default VideoItem
