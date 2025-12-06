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
      <div className="min-h-screen flex items-center justify-center py-12" style={{ backgroundColor: '#E8F1F8' }}>
        <LoadingSpinner size="lg" text="Loading profile..." />
      </div>
    )
  }

  return (
    <div className="min-h-screen py-6 sm:py-8" style={{ backgroundColor: '#E8F1F8' }}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: '#2B3A67' }}>Edit Profile</h2>
          <p className="mt-2 text-sm sm:text-base" style={{ color: '#2B3A67', opacity: 0.7 }}>Update your profile information</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 mb-6" style={{ borderRadius: '8px' }}>
            {error}
          </div>
        )}

        {/* Form */}
        <div className="p-6" style={{ backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(43, 58, 103, 0.15)' }}>
          <form onSubmit={submit} className="space-y-4">
            {/* Profile Picture */}
            <div>
              <label htmlFor="profilePic" className="block text-sm font-medium mb-2" style={{ color: '#2B3A67' }}>
                Profile Picture URL
              </label>
              <input
                id="profilePic"
                type="url"
                value={profilePic}
                onChange={e => setProfilePic(e.target.value)}
                placeholder="https://example.com/profile.jpg"
                className="w-full px-4 py-3 transition-all duration-200 rounded-lg"
                style={{ border: '1px solid #A7C7E7', color: '#2B3A67', outline: 'none' }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#2B3A67'
                  e.target.style.boxShadow = '0 0 0 3px rgba(43, 58, 103, 0.1)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#A7C7E7'
                  e.target.style.boxShadow = 'none'
                }}
              />
              {profilePic && (
                <div className="mt-3">
                  <p className="text-sm font-medium mb-2" style={{ color: '#2B3A67' }}>Preview:</p>
                  <div className="w-24 h-24 rounded-full overflow-hidden flex items-center justify-center" style={{ backgroundColor: '#E8F1F8', border: '2px solid #A7C7E7' }}>
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
              <label htmlFor="name" className="block text-sm font-medium mb-2" style={{ color: '#2B3A67' }}>
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Your name"
                className="w-full px-4 py-3 transition-all duration-200 rounded-lg"
                style={{ border: '1px solid #A7C7E7', color: '#2B3A67', outline: 'none' }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#2B3A67'
                  e.target.style.boxShadow = '0 0 0 3px rgba(43, 58, 103, 0.1)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#A7C7E7'
                  e.target.style.boxShadow = 'none'
                }}
                required
              />
            </div>

            {/* Bio Textarea */}
            <div>
              <label htmlFor="bio" className="block text-sm font-medium mb-2" style={{ color: '#2B3A67' }}>
                Bio
              </label>
              <textarea
                id="bio"
                value={bio}
                onChange={e => setBio(e.target.value)}
                placeholder="Tell us about yourself..."
                className="w-full px-4 py-3 resize-none transition-all duration-200 rounded-lg"
                style={{ border: '1px solid #A7C7E7', color: '#2B3A67', outline: 'none' }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#2B3A67'
                  e.target.style.boxShadow = '0 0 0 3px rgba(43, 58, 103, 0.1)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#A7C7E7'
                  e.target.style.boxShadow = 'none'
                }}
                rows={4}
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2" style={{ color: '#2B3A67' }}>
                New Password (optional)
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Leave blank to keep current password"
                className="w-full px-4 py-3 transition-all duration-200 rounded-lg"
                style={{ border: '1px solid #A7C7E7', color: '#2B3A67', outline: 'none' }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#2B3A67'
                  e.target.style.boxShadow = '0 0 0 3px rgba(43, 58, 103, 0.1)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#A7C7E7'
                  e.target.style.boxShadow = 'none'
                }}
                minLength={6}
              />
              <p className="text-xs mt-1" style={{ color: '#2B3A67', opacity: 0.7 }}>Must be at least 6 characters if provided</p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button 
                type="submit"
                disabled={submitting}
                className="flex-1 px-6 py-3 text-white font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg"
                style={{ backgroundColor: submitting ? '#A7C7E7' : '#2B3A67', boxShadow: '0 2px 4px rgba(43, 58, 103, 0.2)' }}
                onMouseEnter={(e) => !submitting && (e.target.style.backgroundColor = '#1F2B4D')}
                onMouseLeave={(e) => !submitting && (e.target.style.backgroundColor = '#2B3A67')}
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
                style={{ backgroundColor: '#A7C7E7', color: '#2B3A67' }}
                onMouseEnter={(e) => !submitting && (e.target.style.backgroundColor = '#8FB5D9')}
                onMouseLeave={(e) => !submitting && (e.target.style.backgroundColor = '#A7C7E7')}
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