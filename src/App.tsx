import { useState } from 'react'
import CreatePost from './CreatePost'
import Home from './pages/Home'
import './App.css'

function App() {

  const [showCreatePost, setShowCreatePost] = useState(false)

  const handleShowCreatePost = () => {
    setShowCreatePost(!showCreatePost)
  }

  return (
    <>
      <Home />
      <div className="card">
        <button onClick={handleShowCreatePost}>Create Post</button>
      </div>
      {showCreatePost && <CreatePost onClose={handleShowCreatePost} />}

    </>
  )
}

export default App
