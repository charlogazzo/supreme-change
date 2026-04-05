import './index.css';

import { StrictMode, useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { navigateTo } from '@devvit/web/client';

export const App = () => {
  const [started, setStarted] = useState(false);
  const [lane, setLane] = useState<'left' | 'right'>('right');

  // NEW
  const [turning, setTurning] = useState<'left' | 'right' | null>(null);
  const prevLane = useRef<'left' | 'right'>('right');

  useEffect(() => {
    const timer = setTimeout(() => {
      setStarted(true);
    }, 100);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        setLane((current) => (current === 'left' ? current : 'left'));
      } else if (event.key === 'ArrowRight') {
        setLane((current) => (current === 'right' ? current : 'right'));
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  // Detect lane change direction
  useEffect(() => {
    if (lane !== prevLane.current) {
      setTurning(lane);

      const timer = setTimeout(() => {
        setTurning(null);
      }, 250); // must match CSS transition

      prevLane.current = lane;

      return () => clearTimeout(timer);
    }
  }, [lane]);

  const carPositionClass = lane === 'left' ? 'left-1/4' : 'left-3/4';

  const turnClass =
    turning === 'left'
      ? 'car-turn-left'
      : turning === 'right'
      ? 'car-turn-right'
      : '';

  return (
    <div className="relative h-screen w-screen bg-green-500 flex">
      {/* Grass left */}
      <div className="flex-1 bg-green-500"></div>

      {/* Road */}
      <div className="flex-2 bg-gray-500 relative">
        <div className="absolute bottom-0 left-0 w-full h-2 bg-white"></div>
        <div className="absolute top-0 left-0 w-full h-2 bg-black"></div>

        <div className="lane-separator absolute left-1/2 top-0 bottom-0 w-1"></div>

        {/* Checkered lines */}
        <div className="checkered-line absolute left-0 top-0 h-2 w-full"></div>
        <div className="checkered-line-alt absolute left-0 top-2 h-2 w-full"></div>

        {/* Car */}
        {/* <div
          className={`car absolute bottom-10 ${carPositionClass} w-10 h-20 bg-yellow-400 rounded
          ${started ? 'animate-drive' : ''}
          ${turnClass}`}
        ></div> */}
        {/* Car container (handles movement) */}
        <div
          className={`absolute bottom-10 transition-[left] duration-250 ${carPositionClass}
          ${started ? 'animate-drive' : ''}`}
        >
          {/* Actual car (handles rotation) */}
          <div
            className={`car w-10 h-20 bg-yellow-400 rounded ${turnClass}`}
          ></div>
        </div>
      </div>

      {/* Grass right */}
      <div className="flex-1 bg-green-500"></div>

      <footer className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-3 text-[0.8em] text-gray-600 dark:text-gray-400">
        <button onClick={() => navigateTo('https://developers.reddit.com/docs')}>
          Docs
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