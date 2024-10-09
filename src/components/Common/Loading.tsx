import React from "react";

interface LoadingProps {
  className?: string;
}

function Loading({ className }: LoadingProps) {
  return (
    <div
      className={`animate-spin rounded-full h-6 w-6 border-l-2 border-t-2 border-l-white border-t-white border-b-2 border-r-2 border-b-white border-r-sky-400 ${className}`}
    ></div>
  );
}

export default Loading;
