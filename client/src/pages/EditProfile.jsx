// pages/EditProfile.jsx
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../utils/api'
import { useAuth } from '../context/AuthContext'
import LoadingSpinner from '../components/LoadingSpinner'

export default function EditProfile() {
  const { id } = useParams()
  const { user: currentUser, login } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const [profilePic, setProfilePic] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    // Only allow editing own profile
    if (currentUser?.id !== id) {
      navigate('/')
      return
    }

    const loadProfile = async () => {
      setLoading(true)
      setError('')
      try {
        const res = await api.get(`/users/${id}`)
        if (res.data) {
          setName(res.data.name || '')
          setBio(res.data.bio || '')
          setProfilePic(res.data.profilePic || '')
        } else {
          setError('Invalid response from server')
        }
      } catch (err) {
        if (err.response) {
          setError(err.response.data?.message || 'Failed to load profile')
        } else if (err.request) {
          setError('Network error. Please check your connection.')
        } else {
          setError('An unexpected error occurred. Please try again.')
        }
        console.error('Error loading profile:', err)
      } finally {
        setLoading(false)
      }
    }
    loadProfile()
  }, [id, currentUser, navigate])

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    
    try {
      const updates = { name, bio, profilePic }
      if (password) {
        updates.password = password
      }
      
      const res = await api.put(`/users/${id}`, updates)
      
      if (res.data) {
        // Update auth context if updating own profile
        if (currentUser?.id === id) {
          const token = localStorage.getItem('token')
          login(token, { 
            id: res.data._id || res.data.id, 
            name: res.data.name, 
            email: res.data.email, 
            profilePic: res.data.profilePic 
          })
        }
        
        navigate(`/profile/${id}`)
      } else {
        setError('Invalid response from server')
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data?.message || 'Failed to update profile. Please try again.')
      } else if (err.request) {
        setError('Network error. Please check your connection.')
      } else {
        setError('An unexpected error occurred. Please try again.')
      }
      console.error('Error updating profile:', err)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12" style={{ backgroundColor: '#fefbf6' }}>
        <LoadingSpinner size="lg" text="Loading profile..." />
      </div>
    )
  }

  return (
    <div className="min-h-screen py-6 sm:py-8" style={{ backgroundColor: '#fefbf6' }}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: '#333' }}>Edit Profile</h2>
          <p className="mt-2 text-sm sm:text-base" style={{ color: '#666' }}>Update your profile information</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 mb-6" style={{ borderRadius: '8px' }}>
            {error}
          </div>
        )}

        {/* Form */}
        <div className="p-6" style={{ backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <form onSubmit={submit} className="space-y-4">
            {/* Profile Picture */}
            <div>
              <label htmlFor="profilePic" className="block text-sm font-medium mb-2" style={{ color: '#333' }}>
                Profile Picture URL
              </label>
              <input
                id="profilePic"
                type="url"
                value={profilePic}
                onChange={e => setProfilePic(e.target.value)}
                placeholder="https://example.com/profile.jpg"
                className="w-full px-4 py-3 transition-all duration-200 rounded-lg"
                style={{ border: '1px solid #e0e0e0', color: '#333', outline: 'none' }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#666'
                  e.target.style.boxShadow = '0 0 0 3px rgba(102, 102, 102, 0.1)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e0e0e0'
                  e.target.style.boxShadow = 'none'
                }}
              />
              {profilePic && (
                <div className="mt-3">
                  <p className="text-sm font-medium mb-2" style={{ color: '#333' }}>Preview:</p>
                  <div className="w-24 h-24 rounded-full overflow-hidden flex items-center justify-center" style={{ backgroundColor: '#f5f5f5', border: '2px solid #e0e0e0' }}>
                    <img 
                      src={profilePic} 
                      alt="Profile preview"
                      className="w-full h-full object-cover"
                      onError={(e) => e.target.style.display = 'none'}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2" style={{ color: '#333' }}>
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Your name"
                className="w-full px-4 py-3 transition-all duration-200 rounded-lg"
                style={{ border: '1px solid #e0e0e0', color: '#333', outline: 'none' }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#666'
                  e.target.style.boxShadow = '0 0 0 3px rgba(102, 102, 102, 0.1)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e0e0e0'
                  e.target.style.boxShadow = 'none'
                }}
                required
              />
            </div>

            {/* Bio Textarea */}
            <div>
              <label htmlFor="bio" className="block text-sm font-medium mb-2" style={{ color: '#333' }}>
                Bio
              </label>
              <textarea
                id="bio"
                value={bio}
                onChange={e => setBio(e.target.value)}
                placeholder="Tell us about yourself..."
                className="w-full px-4 py-3 resize-none transition-all duration-200 rounded-lg"
                style={{ border: '1px solid #e0e0e0', color: '#333', outline: 'none' }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#666'
                  e.target.style.boxShadow = '0 0 0 3px rgba(102, 102, 102, 0.1)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e0e0e0'
                  e.target.style.boxShadow = 'none'
                }}
                rows={4}
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2" style={{ color: '#333' }}>
                New Password (optional)
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Leave blank to keep current password"
                className="w-full px-4 py-3 transition-all duration-200 rounded-lg"
                style={{ border: '1px solid #e0e0e0', color: '#333', outline: 'none' }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#666'
                  e.target.style.boxShadow = '0 0 0 3px rgba(102, 102, 102, 0.1)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e0e0e0'
                  e.target.style.boxShadow = 'none'
                }}
                minLength={6}
              />
              <p className="text-xs mt-1" style={{ color: '#666' }}>Must be at least 6 characters if provided</p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button 
                type="submit"
                disabled={submitting}
                className="flex-1 px-6 py-3 text-white font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg"
                style={{ backgroundColor: submitting ? '#999' : '#666', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                onMouseEnter={(e) => !submitting && (e.target.style.backgroundColor = '#555')}
                onMouseLeave={(e) => !submitting && (e.target.style.backgroundColor = '#666')}
              >
                {submitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <LoadingSpinner size="sm" />
                    Saving...
                  </span>
                ) : (
                  'Save Changes'
                )}
              </button>
              <button 
                type="button"
                onClick={() => navigate(`/profile/${id}`)}
                disabled={submitting}
                className="px-6 py-3 font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg"
                style={{ backgroundColor: '#f5f5f5', color: '#333' }}
                onMouseEnter={(e) => !submitting && (e.target.style.backgroundColor = '#e8e8e8')}
                onMouseLeave={(e) => !submitting && (e.target.style.backgroundColor = '#f5f5f5')}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

