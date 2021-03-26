import Header from '../components/header/header'
import Search from '../components/search/search'
import VideoList from '../components/video-list/video-list'
import FavoriteForm from '../components/favorite-form/favorite-form'

function Home() {
  return (
    <>
      <Header />
      <Search />
      <VideoList />
      <FavoriteForm />
    </>
  )
}
export default Home
