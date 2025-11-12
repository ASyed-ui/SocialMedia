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
    <div className="feed-container">
      <div className="feed-header">
        <h1>Feed</h1>
        <button onClick={() => navigate('/create')} className="btn create-btn">Create Post</button>
      </div>

      {posts.length === 0 ? (
        <div className="no-posts">No posts yet</div>
      ) : (
        posts.map(p => (
          <PostCard key={p._id} post={p} onDelete={handleDelete} />
        ))
      )}
    </div>
  )
}
