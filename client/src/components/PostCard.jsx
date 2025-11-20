// File: src/components/PostCard.jsx
// -----------------------------
import React from 'react';
import { Link } from 'react-router-dom';

export default function PostCard({ post, onDelete }) {
  return (
    <div className="post-card">
      <div className="post-card-header">
        <div>
          <div className="post-card-author">{post.userId?.name || 'Unknown'}</div>
          <div className="post-card-date">{new Date(post.createdAt).toLocaleString()}</div>
        </div>
        <div className="post-card-actions">
          {post.isOwner && <Link to={`/edit/${post._id}`} className="edit-btn">Edit</Link>}
          {post.isOwner && <button onClick={() => onDelete(post._id)} className="delete-btn">Delete</button>}
        </div>
      </div>
      <div className="post-card-content">{post.content}</div>
      {post.image && <img src={post.image} alt="post" className="post-card-image" />}
    </div>
  );
}
