import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={{ 
      padding: '40px', 
      fontFamily: 'Arial', 
      textAlign: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh',
      color: 'white'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>🎓 UniVerge</h1>
      <p style={{ fontSize: '1.5rem', marginBottom: '10px' }}>
        Alumni-Student Connection Platform
      </p>
      <p style={{ fontSize: '1.1rem', marginBottom: '40px', opacity: 0.9 }}>
        Connecting first-gen students with successful alumni
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
        <Link 
          to="/dashboard" 
          style={{ 
            padding: '15px 30px', 
            fontSize: '18px',
            background: 'transparent',
            color: 'white',
            border: '2px solid white',
            textDecoration: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            margin: '0 10px'
          }}
        >
          Dashboard
        </Link>
      </div>

      <div style={{ 
        background: 'rgba(255,255,255,0.1)', 
        padding: '30px', 
        borderRadius: '15px',
        maxWidth: '600px',
        margin: '0 auto',
        textAlign: 'left'
      }}>
        <h3>🚀 Development Mode Active</h3>
        <p>All features are working with mock data:</p>
        <ul style={{ marginTop: '15px', paddingLeft: '20px' }}>
          <li>✅ Mock Authentication</li>
          <li>✅ AI Matching (Simulated)</li>
          <li>✅ Career Pathfinder</li>
          <li>✅ Real-time Chat (Mock)</li>
          <li>✅ Impact Tracking</li>
        </ul>
      </div>
    </div>
  );
}