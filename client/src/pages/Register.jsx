// pages/Register.jsx
import React, { useState } from 'react'
import api from '../utils/api'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [validationErrors, setValidationErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const validateForm = () => {
    const errors = {}
    if (!name.trim()) {
      errors.name = 'Name is required'
    } else if (name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters'
    }
    if (!email.trim()) {
      errors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Please enter a valid email address'
    }
    if (!password) {
      errors.password = 'Password is required'
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters'
    }
    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setValidationErrors({})

    if (!validateForm()) return

    setLoading(true)
    try {
      const res = await api.post('/register', { name, email, password })
      if (res.data.token && res.data.user) {
        login(res.data.token, res.data.user)
        navigate('/')
      } else {
        setError('Invalid response from server')
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data?.message || 'Registration failed. Please try again.')
      } else if (err.request) {
        setError('Network error. Please check your connection.')
      } else {
        setError('An unexpected error occurred. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleBlur = (field, e) => {
    if (field === 'name') {
      e.target.style.borderColor = validationErrors.name ? '#d32f2f' : '#A7C7E7'
      e.target.style.boxShadow = 'none'
    } else if (field === 'email') {
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setValidationErrors((prev) => ({ ...prev, email: 'Please enter a valid email address' }))
      }
      e.target.style.borderColor = validationErrors.email ? '#d32f2f' : '#A7C7E7'
      e.target.style.boxShadow = 'none'
    } else if (field === 'password') {
      e.target.style.borderColor = validationErrors.password ? '#d32f2f' : '#A7C7E7'
      e.target.style.boxShadow = 'none'
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-8 sm:py-12 px-4" style={{ backgroundColor: '#E8F1F8' }}>
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-2" style={{ color: '#2B3A67' }}>Create Account</h2>
          <p className="text-sm sm:text-base" style={{ color: '#2B3A67' }}>Join our community today</p>
        </div>

        {/* Form Card */}
        <div className="p-6 sm:p-8" style={{ backgroundColor: '#FFFFFF', borderRadius: '8px', boxShadow: '0 2px 8px rgba(43, 58, 103, 0.15)' }}>
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 mb-6 text-sm rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={submit} className="space-y-4 sm:space-y-5" noValidate>
            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2" style={{ color: '#2B3A67' }}>
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                  if (validationErrors.name) setValidationErrors({ ...validationErrors, name: '' })
                }}
                onBlur={(e) => handleBlur('name', e)}
                placeholder="John Doe"
                className="w-full px-4 py-3 transition-all duration-200 rounded-lg"
                style={{
                  border: validationErrors.name ? '1px solid #d32f2f' : '1px solid #A7C7E7',
                  color: '#2B3A67',
                  outline: 'none'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#2B3A67'
                  e.target.style.boxShadow = '0 0 0 3px rgba(43, 58, 103, 0.1)'
                }}
                required
              />
              {validationErrors.name && (
                <p className="text-xs text-red-600 mt-1">{validationErrors.name}</p>
              )}
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: '#2B3A67' }}>
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (validationErrors.email) setValidationErrors({ ...validationErrors, email: '' })
                }}
                onBlur={(e) => handleBlur('email', e)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 transition-all duration-200 rounded-lg"
                style={{
                  border: validationErrors.email ? '1px solid #d32f2f' : '1px solid #A7C7E7',
                  color: '#2B3A67',
                  outline: 'none'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#2B3A67'
                  e.target.style.boxShadow = '0 0 0 3px rgba(43, 58, 103, 0.1)'
                }}
                required
              />
              {validationErrors.email && (
                <p className="text-xs text-red-600 mt-1">{validationErrors.email}</p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2" style={{ color: '#2B3A67' }}>
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  if (validationErrors.password) setValidationErrors({ ...validationErrors, password: '' })
                }}
                onBlur={(e) => handleBlur('password', e)}
                placeholder="••••••••"
                className="w-full px-4 py-3 transition-all duration-200 rounded-lg"
                style={{
                  border: validationErrors.password ? '1px solid #d32f2f' : '1px solid #A7C7E7',
                  color: '#2B3A67',
                  outline: 'none'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#2B3A67'
                  e.target.style.boxShadow = '0 0 0 3px rgba(43, 58, 103, 0.1)'
                }}
                required
                minLength={6}
              />
              {validationErrors.password ? (
                <p className="text-xs text-red-600 mt-1">{validationErrors.password}</p>
              ) : (
                <p className="text-xs mt-1" style={{ color: '#2B3A67', opacity: 0.7 }}>Must be at least 6 characters</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 text-white font-semibold transition-all duration-200 mt-6 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg"
              style={{
                backgroundColor: loading ? '#A7C7E7' : '#2B3A67',
                boxShadow: '0 2px 4px rgba(43, 58, 103, 0.2)',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
              onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = '#1F2B4D')}
              onMouseLeave={(e) => !loading && (e.target.style.backgroundColor = '#2B3A67')}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <LoadingSpinner size="sm" />
                  Creating Account...
                </span>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full" style={{ borderTop: '1px solid #A7C7E7' }}></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2" style={{ backgroundColor: '#FFFFFF', color: '#2B3A67' }}>Already have an account?</span>
            </div>
          </div>

          {/* Login Link */}
          <Link
            to="/login"
            className="block w-full text-center px-6 py-3 font-semibold transition-all duration-200"
            style={{ backgroundColor: '#A7C7E7', color: '#2B3A67', borderRadius: '8px' }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#8FB5D9'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#A7C7E7'}
          >
            Sign In
          </Link>
        </div>

        {/* Footer Text */}
        <p className="text-center text-sm mt-6" style={{ color: '#2B3A67' }}>
          By creating an account, you agree to our Terms and Privacy Policy
        </p>
      </div>
    </div>
  )
}