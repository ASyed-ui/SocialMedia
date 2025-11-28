// pages/Login.jsx
import React, { useState } from 'react'
import api from '../utils/api'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const res = await api.post('/login', { email, password })
      login(res.data.token, res.data.user)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4" style={{ backgroundColor: '#fefbf6' }}>
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-2" style={{ color: '#333' }}>Welcome Back</h2>
          <p style={{ color: '#666' }}>Sign in to your account</p>
        </div>

        {/* Form Card */}
        <div className="p-8" style={{ backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 mb-6 text-sm" style={{ borderRadius: '8px' }}>
              {error}
            </div>
          )}

          <form onSubmit={submit} className="space-y-5">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: '#333' }}>
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 focus:outline-none transition-all duration-200"
                style={{ border: '1px solid #e0e0e0', borderRadius: '8px', color: '#333' }}
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2" style={{ color: '#333' }}>
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 focus:outline-none transition-all duration-200"
                style={{ border: '1px solid #e0e0e0', borderRadius: '8px', color: '#333' }}
                required
              />
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              className="w-full px-6 py-3 text-white font-semibold transition-all duration-200 mt-6"
              style={{ backgroundColor: '#666', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#555'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#666'}
            >
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full" style={{ borderTop: '1px solid #e0e0e0' }}></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2" style={{ backgroundColor: '#ffffff', color: '#666' }}>Don't have an account?</span>
            </div>
          </div>

          {/* Register Link */}
          <Link 
            to="/register"
            className="block w-full text-center px-6 py-3 font-semibold transition-all duration-200"
            style={{ backgroundColor: '#f5f5f5', color: '#333', borderRadius: '8px' }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#e8e8e8'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#f5f5f5'}
          >
            Create Account
          </Link>
        </div>

        {/* Footer Text */}
        <p className="text-center text-sm mt-6" style={{ color: '#666' }}>
          By signing in, you agree to our Terms and Privacy Policy
        </p>
      </div>
    </div>
  )
}