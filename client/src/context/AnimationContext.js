import React, { createContext, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export const AnimationContext = createContext();

export const AnimationProvider = ({ children }) => {
  useEffect(() => {
    // Initialize AOS animation library
    AOS.init({
      duration: 800,
      easing: 'ease-out',
      once: false,
    });
  }, []);

  return (
    <AnimationContext.Provider value={{}}>
      {children}
    </AnimationContext.Provider>
  );
};
