import './index.css';

import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { navigateTo } from '@devvit/web/client';

export const App = () => {
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStarted(true);
    }, 100); // Small delay to ensure render
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative h-screen w-screen bg-green-500 flex">
      {/* Grass left */}
      <div className="flex-1 bg-green-500"></div>
      {/* Road */}
      <div className="flex-2 bg-gray-500 relative">
        {/* Start line */}
        <div className="absolute bottom-0 left-0 w-full h-2 bg-white"></div>
        {/* End line */}
        <div className="absolute top-0 left-0 w-full h-2 bg-black"></div>
        {/* Lane separator */}
        <div className="lane-separator absolute left-1/2 top-0 bottom-0 w-1"></div>
        {/* Car */}
        <div
          className={`absolute bottom-10 left-3/4 w-10 h-20 bg-yellow-400 rounded
          ${started ? 'animate-drive' : ''}`}
        ></div>
      </div>
      {/* Grass right */}
      <div className="flex-1 bg-green-500"></div>
      <footer className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-3 text-[0.8em] text-gray-600 dark:text-gray-400">
        <button
          className="cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors"
          onClick={() => navigateTo('https://developers.reddit.com/docs')}
        >
          Docs
        </button>
        <span className="text-gray-300 dark:text-gray-600">|</span>
        <button
          className="cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors"
          onClick={() => navigateTo('https://www.reddit.com/r/Devvit')}
        >
          r/Devvit
        </button>
        <span className="text-gray-300 dark:text-gray-600">|</span>
        <button
          className="cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors"
          onClick={() => navigateTo('https://discord.com/invite/R7yu2wh9Qz')}
        >
          Discord
        </button>
      </footer>
    </div>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
