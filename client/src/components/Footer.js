import React from 'react';
import { Container } from 'react-bootstrap';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer 
      className="bg-black text-light py-2 mt-5"
      style={{ 
        borderTop: '1px solid rgba(212, 175, 55, 0.3)',
        boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.5), 0 0 5px rgba(212, 175, 55, 0.3)',
        position: 'fixed',
        bottom: 0,
        width: '100%',
        zIndex: 1000
      }}
    >
      <Container className="text-center">
        <div style={{ padding: '5px 0' }}>
          <p className="mb-1" style={{ color: '#d4af37', fontWeight: '500', fontSize: '0.75rem' }}>
            &copy; {new Date().getFullYear()} Recipe Organizer - Dorukhan Özgür (39689)
          </p>
          <p className="mb-0" style={{ color: '#d4af37', opacity: '0.9', fontSize: '0.7rem' }}>
            A web application that provides a categorized recipe collection
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
