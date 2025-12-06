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
    <div className="min-h-screen py-6 sm:py-8" style={{ backgroundColor: '#E8F1F8' }}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: '#2B3A67' }}>Create Post</h2>
          <p className="mt-2 text-sm sm:text-base" style={{ color: '#2B3A67', opacity: 0.7 }}>Share your thoughts with the community</p>
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
            {/* Content Textarea */}
            <div>
              <label htmlFor="content" className="block text-sm font-medium mb-2" style={{ color: '#2B3A67' }}>
                What's on your mind?
              </label>
              <textarea
                id="content"
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="Share your thoughts..."
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
                rows={6}
                required
              />
            </div>

            {/* Image URL Input */}
            <div>
              <label htmlFor="image" className="block text-sm font-medium mb-2" style={{ color: '#2B3A67' }}>
                Image URL (optional)
              </label>
              <input
                id="image"
                type="url"
                value={image}
                onChange={e => setImage(e.target.value)}
                placeholder="https://example.com/image.jpg"
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
            </div>

            {/* Image Preview */}
            {image && (
              <div className="mt-4">
                <p className="text-sm font-medium mb-2" style={{ color: '#2B3A67' }}>Image Preview:</p>
                <img 
                  src={image} 
                  alt="Preview" 
                  className="w-full max-h-64 object-cover"
                  style={{ borderRadius: '8px', border: '1px solid #A7C7E7' }}
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
                style={{ backgroundColor: loading ? '#A7C7E7' : '#2B3A67', boxShadow: '0 2px 4px rgba(43, 58, 103, 0.2)' }}
                onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = '#1F2B4D')}
                onMouseLeave={(e) => !loading && (e.target.style.backgroundColor = '#2B3A67')}
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
                style={{ backgroundColor: '#A7C7E7', color: '#2B3A67' }}
                onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = '#8FB5D9')}
                onMouseLeave={(e) => !loading && (e.target.style.backgroundColor = '#A7C7E7')}
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