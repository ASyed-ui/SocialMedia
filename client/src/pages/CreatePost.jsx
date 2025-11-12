//pages/CrteatePost.jsx
import React, { useState } from 'react'
import api from '../utils/api'
import { useNavigate } from 'react-router-dom'

export default function CreatePost() {
  const [content, setContent] = useState('')
  const [image, setImage] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    try {
      await api.post('/post', { content, image })
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Create failed')
    }
  }

  return (
    <div className="form-container">
      <h2>Create Post</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={submit}>
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="What's on your mind?"
          className="input-field"
          rows={4}
        />
        <input
          value={image}
          onChange={e => setImage(e.target.value)}
          placeholder="Image URL (optional)"
          className="input-field"
        />
        <button className="submit-button">Post</button>
      </form>
    </div>
  )
}
