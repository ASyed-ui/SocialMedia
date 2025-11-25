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
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6 mb-4">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="font-semibold text-gray-900 text-lg">
            {post.userId?.name || 'Unknown'}
          </div>
          <div className="text-sm text-gray-500 mt-1">
            {new Date(post.createdAt).toLocaleString()}
          </div>
        </div>
        
        {/* Actions */}
        {post.isOwner && (
          <div className="flex gap-2">
            <Link 
              to={`/edit/${post._id}`} 
              className="px-3 py-1 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors duration-200"
            >
              Edit
            </Link>
            <button 
              onClick={() => onDelete(post._id)} 
              className="px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors duration-200"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="text-gray-800 mb-4 whitespace-pre-wrap break-words">
        {post.content}
      </div>

      {/* Image */}
      {post.image && (
        <img 
          src={post.image} 
          alt="post" 
          className="w-full rounded-lg mb-4 max-h-96 object-cover"
        />
      )}

      {/* Footer - Like/Dislike */}
      <div className="flex gap-4 pt-4 border-t border-gray-200">
        <button 
          onClick={handleLike} 
          className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 ${
            liked 
              ? 'bg-blue-100 text-blue-600' 
              : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
          } ${(processingLike || processingDislike) ? 'opacity-50 cursor-not-allowed' : ''}`}
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
          className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 ${
            disliked 
              ? 'bg-red-100 text-red-600' 
              : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
          } ${(processingLike || processingDislike) ? 'opacity-50 cursor-not-allowed' : ''}`}
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