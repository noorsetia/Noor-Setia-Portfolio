import React, { useEffect, useRef, useState } from 'react';

export default function Reveal({ children, delay = 0, direction = "up", className = "" }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        // This makes it reappear when scrolling down, and disappear when scrolling away!
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.15, // Triggers when 15% of the section is visible
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  // Determine starting position based on the direction prop
  let startClass = 'translate-y-16'; // default: slide up
  if (direction === 'left') startClass = '-translate-x-24'; // slide in from left
  if (direction === 'right') startClass = 'translate-x-24'; // slide in from right

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-x-0 translate-y-0' : `opacity-0 ${startClass}`
      } ${className}`}
      // Only delay when appearing. When disappearing, reset immediately.
      style={{ transitionDelay: isVisible ? `${delay}ms` : '0ms' }}
    >
      {children}
    </div>
  );
}