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
    <div className="p-6 mb-4 transition-shadow duration-200" style={{ backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="font-semibold text-lg" style={{ color: '#333' }}>
            {post.userId?.name || 'Unknown'}
          </div>
          <div className="text-sm mt-1" style={{ color: '#666' }}>
            {new Date(post.createdAt).toLocaleString()}
          </div>
        </div>
        
        {/* Actions */}
        {post.isOwner && (
          <div className="flex gap-2">
            <Link 
              to={`/edit/${post._id}`} 
              className="px-3 py-1 text-sm text-white transition-colors duration-200"
              style={{ backgroundColor: '#666', borderRadius: '8px' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#555'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#666'}
            >
              Edit
            </Link>
            <button 
              onClick={() => onDelete(post._id)} 
              className="px-3 py-1 text-sm text-white transition-colors duration-200"
              style={{ backgroundColor: '#d32f2f', borderRadius: '8px' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#b71c1c'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#d32f2f'}
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="mb-4 whitespace-pre-wrap break-words" style={{ color: '#333' }}>
        {post.content}
      </div>

      {/* Image */}
      {post.image && (
        <img 
          src={post.image} 
          alt="post" 
          className="w-full mb-4 max-h-96 object-cover"
          style={{ borderRadius: '8px' }}
        />
      )}

      {/* Footer - Like/Dislike */}
      <div className="flex gap-4 pt-4" style={{ borderTop: '1px solid #e0e0e0' }}>
        <button 
          onClick={handleLike} 
          className={`flex items-center gap-2 px-4 py-2 transition-all duration-200 ${
            (processingLike || processingDislike) ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          style={{ 
            backgroundColor: liked ? '#e3f2fd' : '#f5f5f5', 
            color: liked ? '#1976d2' : '#666',
            borderRadius: '8px'
          }}
          onMouseEnter={(e) => {
            if (!processingLike && !processingDislike && !liked) {
              e.target.style.backgroundColor = '#e8e8e8';
            }
          }}
          onMouseLeave={(e) => {
            if (!liked) {
              e.target.style.backgroundColor = '#f5f5f5';
            }
          }}
          disabled={processingLike || processingDislike}
        >
          <img 
            src={likeIcon} 
            alt="like" 
            className={`w-5 h-5 transition-transform duration-200 ${
              liked ? 'scale-110' : ''
            }`}
          />
          <span className="font-medium">{likes.length}</span>
        </button>

        <button 
          onClick={handleDislike} 
          className={`flex items-center gap-2 px-4 py-2 transition-all duration-200 ${
            (processingLike || processingDislike) ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          style={{ 
            backgroundColor: disliked ? '#ffebee' : '#f5f5f5', 
            color: disliked ? '#d32f2f' : '#666',
            borderRadius: '8px'
          }}
          onMouseEnter={(e) => {
            if (!processingLike && !processingDislike && !disliked) {
              e.target.style.backgroundColor = '#e8e8e8';
            }
          }}
          onMouseLeave={(e) => {
            if (!disliked) {
              e.target.style.backgroundColor = '#f5f5f5';
            }
          }}
          disabled={processingLike || processingDislike}
        >
          <img 
            src={dislikeIcon} 
            alt="dislike" 
            className={`w-5 h-5 transition-transform duration-200 ${
              disliked ? 'scale-110' : ''
            }`}
          />
          <span className="font-medium">{dislikes.length}</span>
        </button>
      </div>
    </div>
  );
}