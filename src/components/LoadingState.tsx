
import React, { useEffect, useState } from 'react';

interface LoadingStateProps {
  messages: string[];
}

const LoadingState: React.FC<LoadingStateProps> = ({ messages }) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [progressWidth, setProgressWidth] = useState(0);

  useEffect(() => {
    const messageDuration = 3000; // 3 seconds per message
    const updateInterval = 30; // update progress every 30ms
    const steps = messageDuration / updateInterval;
    const increment = 100 / steps;

    const messageInterval = setInterval(() => {
      setCurrentMessageIndex(prev => {
        if (prev < messages.length - 1) {
          setProgressWidth(0);
          return prev + 1;
        }
        return prev;
      });
    }, messageDuration);

    const progressInterval = setInterval(() => {
      setProgressWidth(prev => {
        if (prev < 100) {
          return prev + increment;
        }
        return prev;
      });
    }, updateInterval);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
    };
  }, [messages.length]);

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto">
      <div className="w-16 h-16 mb-6">
        <div className="w-full h-full border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
      
      <div className="w-full text-center mb-6">
        <div className="h-8 relative overflow-hidden">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-500 flex items-center justify-center ${
                index === currentMessageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <p className="text-foreground font-medium">{message}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="w-full h-1 bg-secondary rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary transition-all duration-150 ease-linear"
          style={{ width: `${progressWidth}%` }}
        ></div>
      </div>
    </div>
  );
};

export default LoadingState;
