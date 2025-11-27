// pages/Profile.jsx
import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import api from '../utils/api'
import { useAuth } from '../context/AuthContext'

export default function Profile() {
  const { id } = useParams()
  const { user: currentUser } = useAuth()
  const navigate = useNavigate()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true)
      setError('')
      try {
        const res = await api.get(`/users/${id}`)
        if (res.data) {
          setProfile(res.data)
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
  }, [id])

  const isOwnProfile = currentUser && currentUser.id === id

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#fefbf6' }}>
        <div className="text-lg" style={{ color: '#666' }}>Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#fefbf6' }}>
        <div className="text-center">
          <div className="text-lg mb-4" style={{ color: '#d32f2f' }}>{error}</div>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 font-semibold transition-all duration-200"
            style={{ backgroundColor: '#666', color: '#ffffff', borderRadius: '8px' }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#555'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#666'}
          >
            Go Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8" style={{ backgroundColor: '#fefbf6' }}>
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold" style={{ color: '#333' }}>Profile</h2>
        </div>

        {/* Profile Card */}
        <div className="p-6" style={{ backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          {/* Profile Picture and Name */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-32 h-32 rounded-full mb-4 overflow-hidden flex items-center justify-center" style={{ backgroundColor: '#f5f5f5', border: '2px solid #e0e0e0' }}>
              {profile?.profilePic ? (
                <img 
                  src={profile.profilePic} 
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-4xl font-bold" style={{ color: '#999' }}>
                  {profile?.name?.charAt(0)?.toUpperCase() || '?'}
                </div>
              )}
            </div>
            <h3 className="text-2xl font-bold mb-2" style={{ color: '#333' }}>
              {profile?.name || 'Unknown User'}
            </h3>
            <p className="text-sm" style={{ color: '#666' }}>
              {profile?.email || ''}
            </p>
          </div>

          {/* Bio Section */}
          <div className="mb-6" style={{ borderTop: '1px solid #e0e0e0', paddingTop: '1.5rem' }}>
            <h4 className="text-sm font-semibold mb-3" style={{ color: '#333' }}>Bio</h4>
            {profile?.bio ? (
              <p className="text-base whitespace-pre-wrap" style={{ color: '#666' }}>
                {profile.bio}
              </p>
            ) : (
              <p className="text-base italic" style={{ color: '#999' }}>
                No bio available
              </p>
            )}
          </div>

          {/* Action Buttons */}
          {isOwnProfile && (
            <div className="flex gap-3 pt-4" style={{ borderTop: '1px solid #e0e0e0' }}>
              <Link
                to={`/profile/${id}/edit`}
                className="flex-1 px-6 py-3 text-white font-semibold text-center transition-all duration-200"
                style={{ backgroundColor: '#666', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#555'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#666'}
              >
                Edit Profile
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

