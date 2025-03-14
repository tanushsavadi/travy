import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import CreatePost from './CreatePost'
import SimpleTabs from './communityTabs'
import './App.css'

function App() {
  const [showCreatePost, setShowCreatePost] = useState(false)
  const [showTabs, setShowTabs] = useState(false)

  const handleShowCreatePost = () => {
    setShowCreatePost(!showCreatePost)
  }

  const toggleTabs = () => {
    setShowTabs(!showTabs)
  }

  return (
    <>
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
        <button onClick={toggleTabs} style={{ marginLeft: '10px' }}>
          {showTabs ? 'Hide Tabs' : 'Show Tabs'}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      {showCreatePost && <CreatePost onClose={handleShowCreatePost} />}
      {showTabs && <SimpleTabs />}
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App