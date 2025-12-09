// pages/Search.jsx
import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../utils/api'
import PostCard from '../components/PostCard'
import LoadingSpinner from '../components/LoadingSpinner'
import { useAuth } from '../context/AuthContext'

export default function Search() {
  const [query, setQuery] = useState('')
  const [users, setUsers] = useState([])
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('all') // 'all', 'users', 'posts'
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const search = async () => {
      if (!query.trim()) {
        setUsers([])
        setPosts([])
        return
      }

      setLoading(true)
      try {
        if (activeTab === 'users') {
          const res = await api.get(`/search/users?q=${encodeURIComponent(query)}`)
          setUsers(res.data || [])
        } else if (activeTab === 'posts') {
          const res = await api.get(`/search/posts?q=${encodeURIComponent(query)}`)
          const data = (res.data || []).map(p => ({ 
            ...p, 
            isOwner: user && p.userId && (p.userId._id === user.id || p.userId === user.id) 
          }))
          setPosts(data)
        } else {
          // Search all
          const res = await api.get(`/search?q=${encodeURIComponent(query)}`)
          setUsers(res.data.users || [])
          const data = (res.data.posts || []).map(p => ({ 
            ...p, 
            isOwner: user && p.userId && (p.userId._id === user.id || p.userId === user.id) 
          }))
          setPosts(data)
        }
      } catch (err) {
        console.error('Error searching:', err)
        if (activeTab === 'users') {
          setUsers([])
        } else if (activeTab === 'posts') {
          setPosts([])
        } else {
          setUsers([])
          setPosts([])
        }
      } finally {
        setLoading(false)
      }
    }

    // Debounce search
    const timeoutId = setTimeout(() => {
      search()
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [query, activeTab, user])

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

  return (
    <div className="min-h-screen py-6 sm:py-8" style={{ backgroundColor: '#E8F1F8' }}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: '#2B3A67' }}>Search</h2>
          
          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search users or posts..."
              className="w-full px-4 py-3 pl-12 transition-all duration-200 rounded-lg"
              style={{ border: '1px solid #A7C7E7', color: '#2B3A67', outline: 'none', backgroundColor: '#ffffff' }}
              onFocus={(e) => {
                e.target.style.borderColor = '#2B3A67'
                e.target.style.boxShadow = '0 0 0 3px rgba(43, 58, 103, 0.1)'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#A7C7E7'
                e.target.style.boxShadow = 'none'
              }}
            />
            <svg
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5"
              style={{ color: '#A7C7E7' }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Tabs */}
        {query.trim() && (
          <div className="flex gap-2 mb-6 border-b" style={{ borderColor: '#A7C7E7' }}>
            <button
              onClick={() => setActiveTab('all')}
              className="px-4 py-2 font-medium transition-colors duration-200 relative"
              style={{ 
                color: activeTab === 'all' ? '#2B3A67' : '#A7C7E7',
                borderBottom: activeTab === 'all' ? '2px solid #2B3A67' : '2px solid transparent'
              }}
            >
              All
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className="px-4 py-2 font-medium transition-colors duration-200 relative"
              style={{ 
                color: activeTab === 'users' ? '#2B3A67' : '#A7C7E7',
                borderBottom: activeTab === 'users' ? '2px solid #2B3A67' : '2px solid transparent'
              }}
            >
              Users
            </button>
            <button
              onClick={() => setActiveTab('posts')}
              className="px-4 py-2 font-medium transition-colors duration-200 relative"
              style={{ 
                color: activeTab === 'posts' ? '#2B3A67' : '#A7C7E7',
                borderBottom: activeTab === 'posts' ? '2px solid #2B3A67' : '2px solid transparent'
              }}
            >
              Posts
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="p-12 text-center" style={{ backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(43, 58, 103, 0.15)' }}>
            <LoadingSpinner size="lg" text="Searching..." />
          </div>
        )}

        {/* Results */}
        {!loading && query.trim() && (
          <>
            {/* Users Results */}
            {(activeTab === 'all' || activeTab === 'users') && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4" style={{ color: '#2B3A67' }}>
                  Users ({users.length})
                </h3>
                {users.length === 0 ? (
                  <div className="p-8 text-center" style={{ backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(43, 58, 103, 0.15)' }}>
                    <p style={{ color: '#A7C7E7' }}>No users found</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {users.map((userResult) => (
                      <Link
                        key={userResult._id}
                        to={`/profile/${userResult._id}`}
                        className="block p-4 transition-all duration-200 rounded-lg"
                        style={{ backgroundColor: '#ffffff', boxShadow: '0 2px 8px rgba(43, 58, 103, 0.15)' }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(43, 58, 103, 0.2)'
                          e.currentTarget.style.transform = 'translateY(-2px)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.boxShadow = '0 2px 8px rgba(43, 58, 103, 0.15)'
                          e.currentTarget.style.transform = 'translateY(0)'
                        }}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#E8F1F8', border: '2px solid #A7C7E7' }}>
                            {userResult.profilePic ? (
                              <img
                                src={userResult.profilePic}
                                alt={userResult.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="text-lg font-bold" style={{ color: '#2B3A67' }}>
                                {userResult.name?.charAt(0)?.toUpperCase() || 'U'}
                              </span>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold truncate" style={{ color: '#2B3A67' }}>
                              {userResult.name}
                            </h4>
                            <p className="text-sm truncate" style={{ color: '#2B3A67', opacity: 0.7 }}>
                              {userResult.email}
                            </p>
                            {userResult.bio && (
                              <p className="text-sm mt-1 line-clamp-2" style={{ color: '#2B3A67', opacity: 0.8 }}>
                                {userResult.bio}
                              </p>
                            )}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Posts Results */}
            {(activeTab === 'all' || activeTab === 'posts') && (
              <div>
                <h3 className="text-lg font-semibold mb-4" style={{ color: '#2B3A67' }}>
                  Posts ({posts.length})
                </h3>
                {posts.length === 0 ? (
                  <div className="p-8 text-center" style={{ backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(43, 58, 103, 0.15)' }}>
                    <p style={{ color: '#A7C7E7' }}>No posts found</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {posts.map(post => (
                      <PostCard key={post._id} post={post} onDelete={handleDelete} />
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {/* Empty State */}
        {!loading && !query.trim() && (
          <div className="p-12 text-center" style={{ backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(43, 58, 103, 0.15)' }}>
            <svg
              className="w-16 h-16 mx-auto mb-4"
              style={{ color: '#A7C7E7' }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p className="text-lg" style={{ color: '#2B3A67' }}>Search for users or posts</p>
            <p className="text-sm mt-2" style={{ color: '#A7C7E7' }}>Type in the search box above to get started</p>
          </div>
        )}
      </div>
    </div>
  )
}

