import React from "react";

interface LoadingProps {
  size?: number;
  className?: string;
}

function Loading({ size = 6, className }: LoadingProps) {
  return (
    <div
      className={`animate-spin rounded-full h-${size} w-${size} border-l-2 border-t-2 border-l-white border-t-white border-b-2 border-r-2 border-b-white border-r-sky-400 ${className}`}
    ></div>
  );
}

export default Loading;
