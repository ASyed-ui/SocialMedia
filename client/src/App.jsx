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
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200">
              <img 
                src={logo} 
                alt="ConnectSphere logo" 
                className="h-10 w-10 object-contain"
              />
              <span className="text-2xl font-bold text-gray-900">
                ConnectSphere
              </span>
            </Link>

            {/* Navigation Links */}
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <Link 
                    to="/" 
                    className="text-gray-700 hover:text-blue-500 font-medium transition-colors duration-200"
                  >
                    Feed
                  </Link>
                  <Link 
                    to="/create" 
                    className="text-gray-700 hover:text-blue-500 font-medium transition-colors duration-200"
                  >
                    Create
                  </Link>
                  <div className="pl-4 border-l border-gray-300">
                    <span className="text-gray-600 text-sm mr-3">
                      {user.name}
                    </span>
                    <button 
                      onClick={logout} 
                      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors duration-200"
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="text-gray-700 hover:text-blue-500 font-medium transition-colors duration-200"
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200"
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
        </Routes>
      </main>
    </div>
  )
}