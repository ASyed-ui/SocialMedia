// File: src/components/PostCard.jsx
// -----------------------------
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { likePost as apiLikePost, dislikePost as apiDislikePost } from '../utils/api';
import likeIcon from '../assets/likes.png';
import dislikeIcon from '../assets/dislike.png';

export default function PostCard({ post, onDelete }) {
  const { user } = useAuth();
  const [likes, setLikes] = useState(post.likes || []);
  const [dislikes, setDislikes] = useState(post.dislikes || []);
  const [processingLike, setProcessingLike] = useState(false);
  const [processingDislike, setProcessingDislike] = useState(false);

  useEffect(() => {
    setLikes(post.likes || []);
    setDislikes(post.dislikes || []);
  }, [post.likes, post.dislikes]);

  const userId = user?.id;
  const liked = !!likes.find(l => (l._id ? l._id.toString() : l.toString()) === userId);
  const disliked = !!dislikes.find(d => (d._id ? d._id.toString() : d.toString()) === userId);

  const handleLike = async () => {
    if (!user) return alert('Please login to like posts.');
    if (processingLike) return;
    setProcessingLike(true);
    try {
      const res = await apiLikePost(post._id);
      if (res?.data?.post) {
        setLikes(res.data.post.likes || []);
        setDislikes(res.data.post.dislikes || []);
      } else {
        // fallback toggle locally
        setLikes(prev => {
          const exists = prev.find(l => (l._id ? l._id.toString() : l.toString()) === userId);
          if (exists) return prev.filter(l => (l._id ? l._id.toString() : l.toString()) !== userId);
          return [...prev, { _id: userId, name: user.name }];
        });
        // also remove from local dislikes
        setDislikes(prev => prev.filter(d => (d._id ? d._id.toString() : d.toString()) !== userId));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setProcessingLike(false);
    }
  };

  const handleDislike = async () => {
    if (!user) return alert('Please login to dislike posts.');
    if (processingDislike) return;
    setProcessingDislike(true);
    try {
      const res = await apiDislikePost(post._id);
      if (res?.data?.post) {
        setLikes(res.data.post.likes || []);
        setDislikes(res.data.post.dislikes || []);
      } else {
        // fallback toggle locally
        setDislikes(prev => {
          const exists = prev.find(d => (d._id ? d._id.toString() : d.toString()) === userId);
          if (exists) return prev.filter(d => (d._id ? d._id.toString() : d.toString()) !== userId);
          return [...prev, { _id: userId, name: user.name }];
        });
        // remove from likes locally
        setLikes(prev => prev.filter(l => (l._id ? l._id.toString() : l.toString()) !== userId));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setProcessingDislike(false);
    }
  };

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

      <div className="post-card-footer">
        <button onClick={handleLike} className={`reaction-btn like-btn ${liked ? 'active' : ''}`} disabled={processingLike || processingDislike}>
          <img src={likeIcon} alt="like" className={`reaction-icon ${liked ? 'active' : ''}`} />
          <span className="reaction-count">{likes.length}</span>
        </button>

        <button onClick={handleDislike} className={`reaction-btn dislike-btn ${disliked ? 'active' : ''}`} disabled={processingLike || processingDislike}>
          <img src={dislikeIcon} alt="dislike" className={`reaction-icon ${disliked ? 'active' : ''}`} />
          <span className="reaction-count">{dislikes.length}</span>
        </button>
      </div>
    </div>
  );
}
