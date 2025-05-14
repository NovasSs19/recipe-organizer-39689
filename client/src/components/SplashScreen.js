import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from 'react-bootstrap';
import { FaUtensils, FaHamburger, FaPizzaSlice, FaWineGlassAlt, FaCarrot, FaCookieBite } from 'react-icons/fa';
import { GiCookingPot, GiCupcake, GiFruitBowl, GiMeal } from 'react-icons/gi';

// Custom component for logo animation
const AnimatedLogo = () => {
  return (
    <motion.div
      className="logo-container"
      style={{
        position: 'relative',
        width: '200px',
        height: '200px',
        margin: '0 auto 30px',
        zIndex: 5
      }}
    >
      {/* Merkez ikon */}
      <motion.div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 2,
          backgroundColor: 'rgba(212, 175, 55, 0.15)',
          borderRadius: '50%',
          padding: '20px',
          boxShadow: '0 0 30px rgba(212, 175, 55, 0.3)'
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.8, 1, 0.8]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: 'reverse'
        }}
      >
        <GiCookingPot size={80} color="#d4af37" />
      </motion.div>
    </motion.div>
  );
};

const SplashScreen = ({ fadeOut }) => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Close splash screen after 5 seconds
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Data for background particles
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 20 + 10
  }));
  
  // Data for food icons
  const foodIcons = [
    { Icon: FaUtensils, color: '#d4af37', size: 20 },
    { Icon: FaPizzaSlice, color: '#d4af37', size: 22 },
    { Icon: FaHamburger, color: '#d4af37', size: 20 },
    { Icon: GiCookingPot, color: '#d4af37', size: 24 },
    { Icon: GiCupcake, color: '#d4af37', size: 22 },
    { Icon: GiFruitBowl, color: '#d4af37', size: 24 },
    { Icon: GiMeal, color: '#d4af37', size: 24 },
    { Icon: FaWineGlassAlt, color: '#d4af37', size: 18 },
    { Icon: FaCarrot, color: '#d4af37', size: 20 },
    { Icon: FaCookieBite, color: '#d4af37', size: 18 }
  ];
  
  return (
    <AnimatePresence mode="wait">
      {showSplash && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: fadeOut ? 0 : 1, scale: fadeOut ? 1.1 : 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.0, ease: [0.19, 1, 0.22, 1] }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'radial-gradient(circle at center, #111 0%, #000 70%)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}
        >
          {/* Arka plan partikülleri */}
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              style={{
                position: 'absolute',
                top: `${particle.y}%`,
                left: `${particle.x}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                borderRadius: '50%',
                backgroundColor: 'rgba(212, 175, 55, 0.2)',
                boxShadow: '0 0 5px rgba(212, 175, 55, 0.3)'
              }}
              animate={{
                y: [particle.y, particle.y - 20, particle.y],
                x: [particle.x, particle.x + (Math.random() * 10 - 5), particle.x],
                opacity: [0, 0.8, 0]
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          ))}
          
          {/* Arka plan ışıltı efekti */}
          <motion.div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '80%',
              height: '80%',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, rgba(0, 0, 0, 0) 70%)',
              transform: 'translate(-50%, -50%)',
              filter: 'blur(30px)'
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: 'reverse'
            }}
          />
          <Container className="text-center">
            {/* Dönen çemberler ve ikonlar */}
            <motion.div
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '800px',
                height: '500px',
                margin: '0 auto'
              }}
            >
              {/* Orbital çemberler */}
              {[1, 2, 3].map((ring, index) => {
                const size = 300 + index * 100;
                const duration = 30 - index * 5;
                const direction = index % 2 === 0 ? 360 : -360;
                
                return (
                  <motion.div
                    key={`ring-${index}`}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      width: size,
                      height: size,
                      borderRadius: '50%',
                      border: `1px solid rgba(212, 175, 55, ${0.1 + index * 0.1})`,
                      transform: 'translate(-50%, -50%)',
                      zIndex: 1
                    }}
                    animate={{ rotate: direction }}
                    transition={{
                      duration: duration,
                      ease: 'linear',
                      repeat: Infinity
                    }}
                  />
                );
              })}
              
              {/* Dönen yemek ikonları */}
              {foodIcons.map((item, index) => {
                const { Icon, color, size } = item;
                const angle = (index / foodIcons.length) * 360;
                const distance = 150 + (index % 3) * 40;
                const duration = 15 + (index % 5);
                const delay = index * 0.2;
                
                // Initial position
                const initialX = Math.cos((angle * Math.PI) / 180) * distance;
                const initialY = Math.sin((angle * Math.PI) / 180) * distance;
                
                return (
                  <motion.div
                    key={`icon-${index}`}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: `translate(-50%, -50%)`,
                      width: '40px',
                      height: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 2
                    }}
                    initial={{ 
                      x: initialX, 
                      y: initialY,
                      opacity: 0,
                      scale: 0
                    }}
                    animate={{ 
                      opacity: 1,
                      scale: 1,
                      x: initialX,
                      y: initialY
                    }}
                    transition={{
                      opacity: { delay: delay, duration: 0.5 },
                      scale: { delay: delay, duration: 0.5 }
                    }}
                  >
                    <motion.div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        border: '1px solid rgba(212, 175, 55, 0.5)',
                        boxShadow: '0 0 10px rgba(212, 175, 55, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      animate={{
                        rotate: index % 2 === 0 ? 360 : -360,
                        scale: [1, 1.1, 1]
                      }}
                      transition={{
                        rotate: { duration: duration, ease: 'linear', repeat: Infinity },
                        scale: { duration: 2, repeat: Infinity, repeatType: 'reverse' }
                      }}
                    >
                      <Icon size={size} color={color} />
                    </motion.div>
                  </motion.div>
                );
              })}
              
              {/* Logo animasyonu */}
              <AnimatedLogo />
              
              <motion.h1
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '3.5rem',
                  fontWeight: 700,
                  color: '#d4af37',
                  marginBottom: '1rem',
                  textShadow: '0 0 10px rgba(212, 175, 55, 0.5)',
                  position: 'relative',
                  zIndex: 2
                }}
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.8, ease: 'easeOut' }}
              >
                Recipe Organizer
              </motion.h1>
              
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '280px' }}
                transition={{ delay: 2, duration: 1, ease: 'easeInOut' }}
                style={{
                  height: '2px',
                  background: 'linear-gradient(90deg, rgba(212, 175, 55, 0) 0%, rgba(212, 175, 55, 1) 50%, rgba(212, 175, 55, 0) 100%)',
                  margin: '0 auto 1.5rem',
                  position: 'relative',
                  zIndex: 10
                }}
              >
                <motion.h1
                  style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: '4rem',
                    fontWeight: 'bold',
                    color: '#d4af37',
                    marginBottom: '10px',
                    textShadow: '0 0 15px rgba(212, 175, 55, 0.6)',
                    letterSpacing: '2px'
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5, ease: 'linear' }}
                >
                  Dorukhan
                </motion.h1>
                

                

              </motion.div>
              
              {/* Profesyonel yükleme göstergesi */}
              <motion.div
                style={{
                  marginTop: '2rem',
                  position: 'relative',
                  width: '60px',
                  height: '60px',
                  margin: '2rem auto',
                  zIndex: 2
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.5, duration: 0.5 }}
              >
                <motion.div
                  style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    right: '0',
                    bottom: '0',
                    borderRadius: '50%',
                    border: '3px solid rgba(212, 175, 55, 0.1)',
                    borderTop: '3px solid #d4af37'
                  }}
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1,
                    ease: 'linear',
                    repeat: Infinity
                  }}
                />
                <motion.div
                  style={{
                    position: 'absolute',
                    top: '5px',
                    left: '5px',
                    right: '5px',
                    bottom: '5px',
                    borderRadius: '50%',
                    border: '3px solid rgba(212, 175, 55, 0.05)',
                    borderBottom: '3px solid #d4af37'
                  }}
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 1.5,
                    ease: 'linear',
                    repeat: Infinity
                  }}
                />
                <motion.div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '15px',
                    height: '15px',
                    borderRadius: '50%',
                    backgroundColor: '#d4af37',
                    transform: 'translate(-50%, -50%)'
                  }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [1, 0.5, 1]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    repeatType: 'reverse'
                  }}
                />
              </motion.div>
            </motion.div>
          </Container>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
