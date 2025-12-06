// pages/Profile.jsx
import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import api from '../utils/api'
import { useAuth } from '../context/AuthContext'
import LoadingSpinner from '../components/LoadingSpinner'
import PostCard from '../components/PostCard'

export default function Profile() {
  const { id } = useParams()
  const { user: currentUser } = useAuth()
  const navigate = useNavigate()
  const [profile, setProfile] = useState(null)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [postsLoading, setPostsLoading] = useState(true)
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

  useEffect(() => {
    const loadPosts = async () => {
      setPostsLoading(true)
      try {
        const res = await api.get('/post')
        if (res.data && Array.isArray(res.data)) {
          // Filter posts by this user
          const userPosts = res.data.filter(p => {
            const postUserId = p.userId?._id || p.userId
            return postUserId === id || postUserId?.toString() === id
          })
          // Mark ownership
          const data = userPosts.map(p => ({ 
            ...p, 
            isOwner: currentUser && (currentUser.id === id) 
          }))
          setPosts(data)
        }
      } catch (err) {
        console.error('Error loading posts:', err)
        // Don't show error for posts, just log it
      } finally {
        setPostsLoading(false)
      }
    }
    if (id) {
      loadPosts()
    }
  }, [id, currentUser])

  const handleDelete = async (postId) => {
    if (!confirm('Delete this post?')) return
    try {
      await api.delete(`/post/${postId}`)
      setPosts(posts.filter(p => p._id !== postId))
    } catch (err) {
      if (err.response) {
        alert(err.response.data?.message || 'Failed to delete post')
      } else {
        alert('Network error. Please try again.')
      }
      console.error('Error deleting post:', err)
    }
  }

  const isOwnProfile = currentUser && currentUser.id === id

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12" style={{ backgroundColor: '#E8F1F8' }}>
        <LoadingSpinner size="lg" text="Loading profile..." />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#E8F1F8' }}>
        <div className="text-center">
          <div className="text-lg mb-4" style={{ color: '#d32f2f' }}>{error}</div>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 font-semibold transition-all duration-200"
            style={{ backgroundColor: '#2B3A67', color: '#ffffff', borderRadius: '8px' }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#1F2B4D'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#2B3A67'}
          >
            Go Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-6 sm:py-8" style={{ backgroundColor: '#E8F1F8' }}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: '#2B3A67' }}>Profile</h2>
        </div>

        {/* Profile Card */}
        <div className="p-6" style={{ backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(43, 58, 103, 0.15)' }}>
          {/* Profile Picture and Name */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full mb-4 overflow-hidden flex items-center justify-center" style={{ backgroundColor: '#E8F1F8', border: '2px solid #A7C7E7' }}>
              {profile?.profilePic ? (
                <img 
                  src={profile.profilePic} 
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-4xl font-bold" style={{ color: '#2B3A67' }}>
                  {profile?.name?.charAt(0)?.toUpperCase() || '?'}
                </div>
              )}
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-2 text-center" style={{ color: '#2B3A67' }}>
              {profile?.name || 'Unknown User'}
            </h3>
            <p className="text-xs sm:text-sm text-center" style={{ color: '#2B3A67', opacity: 0.7 }}>
              {profile?.email || ''}
            </p>
          </div>

          {/* Bio Section */}
          <div className="mb-6" style={{ borderTop: '1px solid #A7C7E7', paddingTop: '1.5rem' }}>
            <h4 className="text-sm font-semibold mb-3" style={{ color: '#2B3A67' }}>Bio</h4>
            {profile?.bio ? (
              <p className="text-base whitespace-pre-wrap" style={{ color: '#2B3A67', opacity: 0.8 }}>
                {profile.bio}
              </p>
            ) : (
              <p className="text-base italic" style={{ color: '#A7C7E7' }}>
                No bio available
              </p>
            )}
          </div>

          {/* Action Buttons */}
          {isOwnProfile && (
            <div className="flex gap-3 pt-4" style={{ borderTop: '1px solid #A7C7E7' }}>
              <Link
                to={`/profile/${id}/edit`}
                className="flex-1 px-6 py-3 text-white font-semibold text-center transition-all duration-200 rounded-lg"
                style={{ backgroundColor: '#2B3A67', boxShadow: '0 2px 4px rgba(43, 58, 103, 0.2)' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#1F2B4D'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#2B3A67'}
              >
                Edit Profile
              </Link>
            </div>
          )}
        </div>

        {/* User's Posts Section */}
        <div className="mt-8">
          <h3 className="text-xl sm:text-2xl font-bold mb-6" style={{ color: '#2B3A67' }}>
            {isOwnProfile ? 'My Posts' : `${profile?.name || 'User'}'s Posts`}
          </h3>

          {postsLoading ? (
            <div className="p-12 text-center" style={{ backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(43, 58, 103, 0.15)' }}>
              <LoadingSpinner size="lg" text="Loading posts..." />
            </div>
          ) : posts.length === 0 ? (
            <div className="p-12 text-center" style={{ backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(43, 58, 103, 0.15)' }}>
              <div className="text-lg" style={{ color: '#2B3A67' }}>
                {isOwnProfile ? "You haven't posted anything yet" : "No posts yet"}
              </div>
              <p className="text-sm mt-2" style={{ color: '#A7C7E7' }}>
                {isOwnProfile ? "Create your first post!" : "This user hasn't created any posts"}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map(post => (
                <PostCard key={post._id} post={post} onDelete={handleDelete} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}