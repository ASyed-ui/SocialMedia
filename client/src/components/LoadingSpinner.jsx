// Loading spinner component
export default function LoadingSpinner({ size = 'md', text = '' }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div
        className={`${sizeClasses[size]} border-4 border-t-transparent rounded-full animate-spin`}
        style={{ borderColor: '#e0e0e0', borderTopColor: '#666' }}
      />
      {text && (
        <p className="text-sm" style={{ color: '#666' }}>{text}</p>
      )}
    </div>
  );
}

