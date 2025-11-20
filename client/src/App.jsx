import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Feed from './pages/Feed'
import CreatePost from './pages/CreatePost'
import EditPost from './pages/EditPost'
import ProtectedRoute from './components/ProtectedRoute'
import { useAuth } from './context/AuthContext'
import logo from './assets/ConnectSphereLogo.png'

export default function App() {
  const { user, logout } = useAuth()

  return (
    <div className="app-container">
      <nav className="nav">
        <div className="nav-inner">
          <Link to="/" className="logo">
            <img src={logo} alt="ConnectSphere logo" className="logo-image" />
            <span className="logo-text">ConnectSphere</span>
          </Link>
          <div className="nav-links">
            {user ? (
              <>
                <Link to="/" className="nav-link">Feed</Link>
                <Link to="/create" className="nav-link">Create</Link>
                <button onClick={logout} className="nav-button logout-button">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link">Login</Link>
                <Link to="/register" className="nav-link">Register</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <main className="main-content">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Feed />} />
          <Route
            path="/create"
            element={<ProtectedRoute><CreatePost /></ProtectedRoute>}
          />
          <Route
            path="/edit/:id"
            element={<ProtectedRoute><EditPost /></ProtectedRoute>}
          />
        </Routes>
      </main>
    </div>
  )
}
