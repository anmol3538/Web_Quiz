import React, { useEffect } from 'react';

const Timer = ({ timeLeft, onTimeUpdate }) => {
  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUpdate(0);
      return;
    }

    const timerId = setTimeout(() => {
      onTimeUpdate(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timerId);
  }, [timeLeft, onTimeUpdate]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getTimerColor = () => {
    if (timeLeft < 300) return 'text-red-600'; // Less than 5 minutes
    if (timeLeft < 600) return 'text-yellow-600'; // Less than 10 minutes
    return 'text-green-600';
  };

  const getProgressColor = () => {
    if (timeLeft < 300) return 'bg-red-500';
    if (timeLeft < 600) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div className="text-center">
        <div className="text-gray-600 text-sm font-medium mb-2">
          Time Remaining
        </div>
        <div className={`text-4xl font-bold font-mono ${getTimerColor()} mb-3`}>
          {formatTime(timeLeft)}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-1000 ${getProgressColor()}`}
            style={{ width: `${(timeLeft / (30 * 60)) * 100}%` }}
          ></div>
        </div>
        {timeLeft < 300 && (
          <div className="text-red-500 text-sm font-medium mt-2 animate-pulse">
            Hurry up! Time is running out
          </div>
        )}
      </div>
    </div>
  );
};

export default Timer;