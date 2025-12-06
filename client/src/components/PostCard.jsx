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
    <div className="p-6 mb-4 transition-shadow duration-200" style={{ backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(43, 58, 103, 0.15)' }}>
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <Link
            to={`/profile/${post.userId?._id || post.userId}`}
            className="font-semibold text-lg transition-colors duration-200 hover:underline inline-block"
            style={{ color: '#2B3A67' }}
            onMouseEnter={(e) => e.target.style.color = '#1F2B4D'}
            onMouseLeave={(e) => e.target.style.color = '#2B3A67'}
          >
            {post.userId?.name || 'Unknown'}
          </Link>
          <div className="text-sm mt-1" style={{ color: '#2B3A67', opacity: 0.7 }}>
            {new Date(post.createdAt).toLocaleString()}
          </div>
        </div>
        
        {/* Actions */}
        {post.isOwner && (
          <div className="flex gap-2">
            <Link 
              to={`/edit/${post._id}`} 
              className="px-3 py-1 text-sm text-white transition-colors duration-200"
              style={{ backgroundColor: '#2B3A67', borderRadius: '8px' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#1F2B4D'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#2B3A67'}
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
      <div className="mb-4 whitespace-pre-wrap break-words" style={{ color: '#2B3A67' }}>
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
      <div className="flex gap-4 pt-4" style={{ borderTop: '1px solid #A7C7E7' }}>
        <button 
          onClick={handleLike} 
          className={`flex items-center gap-2 px-4 py-2 transition-all duration-200 ${
            (processingLike || processingDislike) ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          style={{ 
            backgroundColor: liked ? '#D6E9F7' : '#E8F1F8', 
            color: liked ? '#2B3A67' : '#2B3A67',
            borderRadius: '8px',
            border: liked ? '1px solid #A7C7E7' : '1px solid transparent'
          }}
          onMouseEnter={(e) => {
            if (!processingLike && !processingDislike && !liked) {
              e.target.style.backgroundColor = '#D6E9F7';
            }
          }}
          onMouseLeave={(e) => {
            if (!liked) {
              e.target.style.backgroundColor = '#E8F1F8';
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
            backgroundColor: disliked ? '#ffebee' : '#E8F1F8', 
            color: disliked ? '#d32f2f' : '#2B3A67',
            borderRadius: '8px',
            border: disliked ? '1px solid #d32f2f' : '1px solid transparent'
          }}
          onMouseEnter={(e) => {
            if (!processingLike && !processingDislike && !disliked) {
              e.target.style.backgroundColor = '#D6E9F7';
            }
          }}
          onMouseLeave={(e) => {
            if (!disliked) {
              e.target.style.backgroundColor = '#E8F1F8';
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