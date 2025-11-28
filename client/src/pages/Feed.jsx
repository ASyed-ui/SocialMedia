// pages/Feed.jsx
import React, { useEffect, useState } from 'react'
import api from '../utils/api'
import PostCard from '../components/PostCard'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner'

export default function Feed() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { user } = useAuth()
  const navigate = useNavigate()

  const fetchPosts = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await api.get('/post')
      if (res.data && Array.isArray(res.data)) {
        // mark ownership
        const data = res.data.map(p => ({ ...p, isOwner: user && p.userId && (p.userId._id === user.id || p.userId === user.id) }))
        setPosts(data)
      } else {
        setError('Invalid response format')
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data?.message || 'Failed to load posts')
      } else if (err.request) {
        setError('Network error. Please check your connection.')
      } else {
        setError('An unexpected error occurred. Please try again.')
      }
      console.error('Error fetching posts:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchPosts() }, [user])

  const handleDelete = async (id) => {
    if (!confirm('Delete this post?')) return
    try {
      await api.delete(`/post/${id}`)
      setPosts(posts.filter(p => p._id !== id))
    } catch (err) {
      if (err.response) {
        alert(err.response.data?.message || 'Failed to delete post')
      } else {
        alert('Network error. Please try again.')
      }
      console.error('Error deleting post:', err)
    }
  }

  return (
    <div className="min-h-screen py-6 sm:py-8" style={{ backgroundColor: '#fefbf6' }}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: '#333' }}>Feed</h1>
          <button 
            onClick={() => navigate('/create')} 
            className="w-full sm:w-auto px-6 py-2.5 text-white font-semibold transition-all duration-200 rounded-lg"
            style={{ backgroundColor: '#666', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#555'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#666'}
          >
            Create Post
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg" style={{ borderRadius: '8px' }}>
            <p className="font-medium">Error loading posts</p>
            <p className="text-sm mt-1">{error}</p>
            <button
              onClick={fetchPosts}
              className="mt-3 px-4 py-2 text-sm font-medium transition-colors duration-200"
              style={{ backgroundColor: '#d32f2f', color: '#ffffff', borderRadius: '8px' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#b71c1c'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#d32f2f'}
            >
              Retry
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="p-12 text-center" style={{ backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <LoadingSpinner size="lg" text="Loading posts..." />
          </div>
        )}

        {/* Posts List */}
        {!loading && !error && (
          posts.length === 0 ? (
            <div className="p-12 text-center" style={{ backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <div className="text-lg" style={{ color: '#666' }}>No posts yet</div>
              <p className="text-sm mt-2" style={{ color: '#999' }}>Be the first to create a post!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map(p => (
                <PostCard key={p._id} post={p} onDelete={handleDelete} />
              ))}
            </div>
          )
        )}
      </div>
    </div>
  )
}