// pages/Login.jsx
import React, { useState } from 'react'
import api from '../utils/api'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [validationErrors, setValidationErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const validateForm = () => {
    const errors = {}
    if (!email.trim()) {
      errors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Please enter a valid email address'
    }
    if (!password) {
      errors.password = 'Password is required'
    }
    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setValidationErrors({})
    
    if (!validateForm()) {
      return
    }
    
    setLoading(true)
    
    try {
      const res = await api.post('/login', { email, password })
      if (res.data.token && res.data.user) {
        login(res.data.token, res.data.user)
        navigate('/')
      } else {
        setError('Invalid response from server')
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data?.message || 'Login failed. Please check your credentials.')
      } else if (err.request) {
        setError('Network error. Please check your connection.')
      } else {
        setError('An unexpected error occurred. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-8 sm:py-12 px-4" style={{ backgroundColor: '#fefbf6' }}>
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-2" style={{ color: '#333' }}>Welcome Back</h2>
          <p className="text-sm sm:text-base" style={{ color: '#666' }}>Sign in to your account</p>
        </div>

        {/* Form Card */}
        <div className="p-6 sm:p-8" style={{ backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 mb-6 text-sm rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={submit} className="space-y-4 sm:space-y-5" noValidate>
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: '#333' }}>
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (validationErrors.email) {
                    setValidationErrors({ ...validationErrors, email: '' })
                  }
                }}
                onBlur={() => {
                  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                    setValidationErrors({ ...validationErrors, email: 'Please enter a valid email address' })
                  }
                }}
                placeholder="you@example.com"
                className="w-full px-4 py-3 transition-all duration-200 rounded-lg"
                style={{ 
                  border: validationErrors.email ? '1px solid #d32f2f' : '1px solid #e0e0e0', 
                  color: '#333',
                  outline: 'none'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#666'
                  e.target.style.boxShadow = '0 0 0 3px rgba(102, 102, 102, 0.1)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = validationErrors.email ? '#d32f2f' : '#e0e0e0'
                  e.target.style.boxShadow = 'none'
                }}
                required
              />
              {validationErrors.email && (
                <p className="text-xs text-red-600 mt-1">{validationErrors.email}</p>
              )}
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
                onChange={(e) => {
                  setPassword(e.target.value)
                  if (validationErrors.password) {
                    setValidationErrors({ ...validationErrors, password: '' })
                  }
                }}
                placeholder="••••••••"
                className="w-full px-4 py-3 transition-all duration-200 rounded-lg"
                style={{ 
                  border: validationErrors.password ? '1px solid #d32f2f' : '1px solid #e0e0e0', 
                  color: '#333',
                  outline: 'none'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#666'
                  e.target.style.boxShadow = '0 0 0 3px rgba(102, 102, 102, 0.1)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = validationErrors.password ? '#d32f2f' : '#e0e0e0'
                  e.target.style.boxShadow = 'none'
                }}
                required
              />
              {validationErrors.password && (
                <p className="text-xs text-red-600 mt-1">{validationErrors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 text-white font-semibold transition-all duration-200 mt-6 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg"
              style={{ 
                backgroundColor: loading ? '#999' : '#666', 
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
              onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = '#555')}
              onMouseLeave={(e) => !loading && (e.target.style.backgroundColor = '#666')}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <LoadingSpinner size="sm" />
                  Signing In...
                </span>
              ) : (
                'Sign In'
              )}
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