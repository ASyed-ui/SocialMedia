// pages/Feed.jsx
import React, { useEffect, useState } from 'react'
import api from '../utils/api'
import PostCard from '../components/PostCard'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Feed() {
  const [posts, setPosts] = useState([])
  const { user } = useAuth()
  const navigate = useNavigate()

  const fetchPosts = async () => {
    try {
      const res = await api.get('/post')
      // mark ownership
      const data = res.data.map(p => ({ ...p, isOwner: user && p.userId && p.userId._id === user.id }))
      setPosts(data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => { fetchPosts() }, [user])

  const handleDelete = async (id) => {
    if (!confirm('Delete this post?')) return
    try {
      await api.delete(`/post/${id}`)
      setPosts(posts.filter(p => p._id !== id))
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Feed</h1>
          <button 
            onClick={() => navigate('/create')} 
            className="px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
          >
            Create Post
          </button>
        </div>

        {/* Posts List */}
        {posts.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-gray-500 text-lg">No posts yet</div>
            <p className="text-gray-400 text-sm mt-2">Be the first to create a post!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map(p => (
              <PostCard key={p._id} post={p} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}