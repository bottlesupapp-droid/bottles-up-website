import { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [videoEnded, setVideoEnded] = useState(false);

  useEffect(() => {
    // Auto complete loading after 8 seconds as a fallback
    const timer = setTimeout(() => {
      if (!videoEnded) {
        onLoadingComplete();
      }
    }, 8000);

    return () => clearTimeout(timer);
  }, [videoEnded, onLoadingComplete]);

  const handleVideoEnd = () => {
    setVideoEnded(true);
    // Add a small delay before transitioning
    setTimeout(() => {
      onLoadingComplete();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="relative w-full h-full flex items-center justify-center">
        <video
          className="max-w-full max-h-full object-contain"
          autoPlay
          muted
          playsInline
          onEnded={handleVideoEnd}
          onError={() => onLoadingComplete()} // Fallback if video fails to load
        >
          <source src="/loading_video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Optional: Add a loading indicator if video doesn't load */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 opacity-50"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen; 