//pages/CreatePost.jsx
import React, { useState } from 'react'
import api from '../utils/api'
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner'

export default function CreatePost() {
  const [content, setContent] = useState('')
  const [image, setImage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    
    try {
      const res = await api.post('/post', { content, image })
      if (res.data) {
        navigate('/')
      } else {
        setError('Invalid response from server')
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data?.message || 'Failed to create post. Please try again.')
      } else if (err.request) {
        setError('Network error. Please check your connection.')
      } else {
        setError('An unexpected error occurred. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen py-6 sm:py-8" style={{ backgroundColor: '#fefbf6' }}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: '#333' }}>Create Post</h2>
          <p className="mt-2 text-sm sm:text-base" style={{ color: '#666' }}>Share your thoughts with the community</p>
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
            {/* Content Textarea */}
            <div>
              <label htmlFor="content" className="block text-sm font-medium mb-2" style={{ color: '#333' }}>
                What's on your mind?
              </label>
              <textarea
                id="content"
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="Share your thoughts..."
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
                rows={6}
                required
              />
            </div>

            {/* Image URL Input */}
            <div>
              <label htmlFor="image" className="block text-sm font-medium mb-2" style={{ color: '#333' }}>
                Image URL (optional)
              </label>
              <input
                id="image"
                type="url"
                value={image}
                onChange={e => setImage(e.target.value)}
                placeholder="https://example.com/image.jpg"
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
            </div>

            {/* Image Preview */}
            {image && (
              <div className="mt-4">
                <p className="text-sm font-medium mb-2" style={{ color: '#333' }}>Image Preview:</p>
                <img 
                  src={image} 
                  alt="Preview" 
                  className="w-full max-h-64 object-cover"
                  style={{ borderRadius: '8px', border: '1px solid #e0e0e0' }}
                  onError={(e) => e.target.style.display = 'none'}
                />
              </div>
            )}

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button 
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-3 text-white font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg"
                style={{ backgroundColor: loading ? '#999' : '#666', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = '#555')}
                onMouseLeave={(e) => !loading && (e.target.style.backgroundColor = '#666')}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <LoadingSpinner size="sm" />
                    Posting...
                  </span>
                ) : (
                  'Post'
                )}
              </button>
              <button 
                type="button"
                onClick={() => navigate('/')}
                disabled={loading}
                className="px-6 py-3 font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg"
                style={{ backgroundColor: '#f5f5f5', color: '#333' }}
                onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = '#e8e8e8')}
                onMouseLeave={(e) => !loading && (e.target.style.backgroundColor = '#f5f5f5')}
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