// pages/EditPost.jsx
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../utils/api'

export default function EditPost() {
  const { id } = useParams()
  const [content, setContent] = useState('')
  const [image, setImage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setError('')
      try {
        const res = await api.get(`/post/${id}`)
        if (res.data) {
          setContent(res.data.content || '')
          setImage(res.data.image || '')
        } else {
          setError('Invalid response from server')
        }
      } catch (err) {
        if (err.response) {
          setError(err.response.data?.message || 'Failed to load post')
        } else if (err.request) {
          setError('Network error. Please check your connection.')
        } else {
          setError('An unexpected error occurred. Please try again.')
        }
        console.error('Error loading post:', err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    
    try {
      const res = await api.put(`/post/${id}`, { content, image })
      if (res.data) {
        navigate('/')
      } else {
        setError('Invalid response from server')
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data?.message || 'Failed to update post. Please try again.')
      } else if (err.request) {
        setError('Network error. Please check your connection.')
      } else {
        setError('An unexpected error occurred. Please try again.')
      }
      console.error('Error updating post:', err)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#fefbf6' }}>
        <div className="text-lg" style={{ color: '#666' }}>Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8" style={{ backgroundColor: '#fefbf6' }}>
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold" style={{ color: '#333' }}>Edit Post</h2>
          <p className="mt-2" style={{ color: '#666' }}>Update your post content</p>
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
                Content
              </label>
              <textarea
                id="content"
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="What's on your mind?"
                className="w-full px-4 py-3 focus:outline-none resize-none transition-all duration-200"
                style={{ border: '1px solid #e0e0e0', borderRadius: '8px', color: '#333' }}
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
                className="w-full px-4 py-3 focus:outline-none transition-all duration-200"
                style={{ border: '1px solid #e0e0e0', borderRadius: '8px', color: '#333' }}
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
            <div className="flex gap-3 pt-4">
              <button 
                type="submit"
                disabled={submitting}
                className="flex-1 px-6 py-3 text-white font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: submitting ? '#999' : '#666', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                onMouseEnter={(e) => !submitting && (e.target.style.backgroundColor = '#555')}
                onMouseLeave={(e) => !submitting && (e.target.style.backgroundColor = '#666')}
              >
                {submitting ? 'Saving...' : 'Save Changes'}
              </button>
              <button 
                type="button"
                onClick={() => navigate('/')}
                disabled={submitting}
                className="px-6 py-3 font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: '#f5f5f5', color: '#333', borderRadius: '8px' }}
                onMouseEnter={(e) => !submitting && (e.target.style.backgroundColor = '#e8e8e8')}
                onMouseLeave={(e) => !submitting && (e.target.style.backgroundColor = '#f5f5f5')}
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