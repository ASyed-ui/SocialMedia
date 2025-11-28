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
  const navigate = useNavigate()

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get(`/post/${id}`)
        setContent(res.data.content)
        setImage(res.data.image || '')
      } catch (err) {
        console.error(err)
        setError('Failed to load post')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  const submit = async (e) => {
    e.preventDefault()
    try {
      await api.put(`/post/${id}`, { content, image })
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed')
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
                className="flex-1 px-6 py-3 text-white font-semibold transition-all duration-200"
                style={{ backgroundColor: '#666', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#555'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#666'}
              >
                Save Changes
              </button>
              <button 
                type="button"
                onClick={() => navigate('/')}
                className="px-6 py-3 font-semibold transition-all duration-200"
                style={{ backgroundColor: '#f5f5f5', color: '#333', borderRadius: '8px' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#e8e8e8'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#f5f5f5'}
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