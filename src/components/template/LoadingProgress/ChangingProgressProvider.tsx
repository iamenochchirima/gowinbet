import React, { useState, useEffect, ReactNode } from "react";

interface ChangingProgressProviderProps {
  loading: boolean;
  onProgress: (progress: number) => void;
  children: (value: number) => ReactNode;
}

const ChangingProgressProvider: React.FC<ChangingProgressProviderProps> = ({
  loading,
  onProgress,
  children
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!loading) {
      setProgress(100);
      return;
    }

    setProgress(0);
    const startTime = Date.now();
    const expectedDuration = 8000; 

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / expectedDuration) * 100, 90); 
      setProgress(newProgress);
      onProgress?.(newProgress);
    };

    updateProgress(); // Initial update
    const intervalId = setInterval(updateProgress, 200);

    return () => clearInterval(intervalId);
  }, [loading, onProgress]);

  return <>{children(progress)}</>;
};

export default ChangingProgressProvider;