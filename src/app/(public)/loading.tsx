import React from 'react'

const Loading = () => {
  return (
             <div className="fixed inset-0 flex items-center justify-center bg-white/90 dark:bg-black/95 backdrop-blur-sm transition-colors duration-300">
      <div className="relative flex flex-col items-center">
        {/* Spinner */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-t-red-500 border-r-red-500 border-b-transparent border-l-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-0 border-4 border-t-transparent border-r-transparent border-b-red-500 border-l-red-500 rounded-full animate-spin [animation-duration:1.5s] opacity-50"></div>
          {/* Gradient glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/30 to-transparent rounded-full blur-md animate-pulse"></div>
        </div>
        {/* Loading text */}
        <p className="mt-4 text-lg font-semibold text-red-500 dark:text-red-400 animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  )
}

export default Loading