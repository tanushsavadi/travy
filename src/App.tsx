import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
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
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={handleShowCreatePost}>Create Post</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      {showCreatePost && <CreatePost onClose={handleShowCreatePost} />}
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
