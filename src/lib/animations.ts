
import { CSSProperties } from 'react';

interface AnimationProps {
  delay?: number;
  duration?: number;
}

export const fadeInUp = ({ delay = 0, duration = 0.5 }: AnimationProps = {}): CSSProperties => ({
  opacity: 0,
  transform: 'translateY(20px)',
  animation: `fadeInUp ${duration}s ease-out forwards ${delay}s`,
});

export const fadeIn = ({ delay = 0, duration = 0.3 }: AnimationProps = {}): CSSProperties => ({
  opacity: 0,
  animation: `fadeIn ${duration}s ease-out forwards ${delay}s`,
});

export const staggerChildren = (
  childrenCount: number,
  baseDelay: number = 0.1,
  increment: number = 0.05
): { delay: number }[] => {
  return Array.from({ length: childrenCount }, (_, i) => ({
    delay: baseDelay + i * increment,
  }));
};

// Add keyframes to the document if needed
const injectKeyframes = () => {
  if (typeof document === 'undefined') return;
  
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  `;
  document.head.appendChild(style);
};

// Call this function when the app initializes
export const initAnimations = () => {
  if (typeof window !== 'undefined') {
    injectKeyframes();
  }
};
