import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Feed from './pages/Feed'
import CreatePost from './pages/CreatePost'
import EditPost from './pages/EditPost'
import Profile from './pages/Profile'
import EditProfile from './pages/EditProfile'
import ProtectedRoute from './components/ProtectedRoute'
import { useAuth } from './context/AuthContext'
import logo from './assets/ConnectSphereLogo.png'

export default function App() {
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#fefbf6' }}>
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50" style={{ backgroundColor: '#ffffff', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200">
              <img 
                src={logo} 
                alt="ConnectSphere logo" 
                className="h-10 w-10 object-contain"
              />
              <span className="text-2xl font-bold" style={{ color: '#333' }}>
                ConnectSphere
              </span>
            </Link>

            {/* Navigation Links */}
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <Link 
                    to="/" 
                    className="font-medium transition-colors duration-200"
                    style={{ color: '#333' }}
                    onMouseEnter={(e) => e.target.style.color = '#666'}
                    onMouseLeave={(e) => e.target.style.color = '#333'}
                  >
                    Feed
                  </Link>
                  <Link 
                    to="/create" 
                    className="font-medium transition-colors duration-200"
                    style={{ color: '#333' }}
                    onMouseEnter={(e) => e.target.style.color = '#666'}
                    onMouseLeave={(e) => e.target.style.color = '#333'}
                  >
                    Create
                  </Link>
                  <Link 
                    to={`/profile/${user.id}`}
                    className="font-medium transition-colors duration-200"
                    style={{ color: '#333' }}
                    onMouseEnter={(e) => e.target.style.color = '#666'}
                    onMouseLeave={(e) => e.target.style.color = '#333'}
                  >
                    Profile
                  </Link>
                  <div className="pl-4" style={{ borderLeft: '1px solid #e0e0e0' }}>
                    <span className="text-sm mr-3" style={{ color: '#666' }}>
                      {user.name}
                    </span>
                    <button 
                      onClick={logout} 
                      className="px-4 py-2 text-white font-medium transition-colors duration-200"
                      style={{ backgroundColor: '#d32f2f', borderRadius: '8px' }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#b71c1c'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = '#d32f2f'}
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="font-medium transition-colors duration-200"
                    style={{ color: '#333' }}
                    onMouseEnter={(e) => e.target.style.color = '#666'}
                    onMouseLeave={(e) => e.target.style.color = '#333'}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="px-4 py-2 text-white font-medium transition-colors duration-200"
                    style={{ backgroundColor: '#666', borderRadius: '8px' }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#555'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#666'}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
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
          <Route path="/profile/:id" element={<Profile />} />
          <Route
            path="/profile/:id/edit"
            element={<ProtectedRoute><EditProfile /></ProtectedRoute>}
          />
        </Routes>
      </main>
    </div>
  )
}