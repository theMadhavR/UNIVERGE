import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={{
      padding: '40px',
      fontFamily: 'Arial',
      textAlign: 'center',
      background: 'linear-gradient(135deg, #574cf3ff 0%, #7536b5ff 100%)',
      minHeight: '100vh',
      color: 'white'
    }}>
      <h1 style={{ fontSize: '5rem', marginBottom: '50px' }}>UNIVERGE</h1>
      <p style={{ fontSize: '2.5rem', marginBottom: '40px' }}>
        Alumni-Student Connection Platform
      </p>
      <p style={{ fontSize: '2.5rem', marginBottom: '80px', opacity: 0.9 }}>
        Connecting First-gen Students With Successful Alumni
      </p>

      <div style={{ marginBottom: '40px' }}>
        <Link
          to="/auth"
          style={{
            padding: '15px 30px',
            fontSize: '18px',
            background: 'white',
            color: '#667eea',
            textDecoration: 'none',
            position: 'relative',
            borderRadius: '8px',
            fontWeight: 'bold',
            margin: '0 10px'
          }}
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}