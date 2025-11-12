// pages/EditPost.jsx
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../utils/api'

export default function EditPost() {
  const { id } = useParams()
  const [content, setContent] = useState('')
  const [image, setImage] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get(`/post/${id}`)
        setContent(res.data.content)
        setImage(res.data.image || '')
      } catch (err) {
        console.error(err)
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

  return (
    <div className="form-container">
      <h2>Edit Post</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={submit}>
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          className="input-field"
          rows={4}
        />
        <input
          value={image}
          onChange={e => setImage(e.target.value)}
          placeholder="Image URL (optional)"
          className="input-field"
        />
        <button className="submit-button edit-button">Save</button>
      </form>
    </div>
  )
}
