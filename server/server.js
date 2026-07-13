import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pg from 'pg';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(express.json());

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

// Test DB Connection and Initialize Tables
async function initDb() {
  try {
    const client = await pool.connect();
    console.log("Connected to PostgreSQL database successfully");
    client.release();
    
    // Create users table
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        user_type VARCHAR(50) NOT NULL DEFAULT 'student',
        theme VARCHAR(10) NOT NULL DEFAULT 'light',
        bio TEXT,
        background JSONB DEFAULT '{}'::jsonb,
        location JSONB DEFAULT '{}'::jsonb,
        education_level VARCHAR(100),
        current_school VARCHAR(255),
        major VARCHAR(255),
        graduation_year VARCHAR(10),
        career_interests TEXT[] DEFAULT '{}'::text[],
        skills TEXT[] DEFAULT '{}'::text[],
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    await pool.query(createTableQuery);
    console.log("Database tables initialized successfully");
  } catch (err) {
    console.error("Database connection/initialization error:", err);
  }
}
initDb();

// JWT Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.status(401).json({ message: 'Token required' });
  
  jwt.verify(token, process.env.JWT_SECRET || 'univerge_jwt_secret_key_123', (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired token' });
    req.user = user;
    next();
  });
};

// Endpoints

// Register
app.post('/api/auth/register', async (req, res) => {
  const { email, password, first_name, last_name, user_type } = req.body;
  if (!email || !password || !first_name || !last_name) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  
  try {
    const userExist = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userExist.rows.length > 0) {
      return res.status(400).json({ message: 'Email already registered' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      `INSERT INTO users (email, password, first_name, last_name, user_type) 
       VALUES ($1, $2, $3, $4, $5) RETURNING id, email, first_name, last_name, user_type, theme`,
      [email, hashedPassword, first_name, last_name, user_type || 'student']
    );
    
    const user = result.rows[0];
    const token = jwt.sign(
      { id: user.id, email: user.email, user_type: user.user_type },
      process.env.JWT_SECRET || 'univerge_jwt_secret_key_123',
      { expiresIn: '30d' }
    );
    
    res.status(201).json({
      token,
      user,
      message: 'Registration successful'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }
  
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    
    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    
    const token = jwt.sign(
      { id: user.id, email: user.email, user_type: user.user_type },
      process.env.JWT_SECRET || 'univerge_jwt_secret_key_123',
      { expiresIn: '30d' }
    );
    
    const { password: _, ...userWithoutPassword } = user;
    res.json({
      token,
      user: userWithoutPassword,
      message: 'Login successful'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// Get profile
app.get('/api/users/me', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT id, email, first_name, last_name, user_type, theme, bio, background, location, education_level, current_school, major, graduation_year, career_interests, skills FROM users WHERE id = $1', [req.user.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error retrieving profile' });
  }
});

// Update profile
app.put('/api/users/profile', authenticateToken, async (req, res) => {
  const { 
    first_name, last_name, bio, background, location, 
    education_level, current_school, major, graduation_year, 
    career_interests, skills 
  } = req.body;
  
  try {
    const query = `
      UPDATE users 
      SET first_name = COALESCE($1, first_name),
          last_name = COALESCE($2, last_name),
          bio = COALESCE($3, bio),
          background = COALESCE($4, background),
          location = COALESCE($5, location),
          education_level = COALESCE($6, education_level),
          current_school = COALESCE($7, current_school),
          major = COALESCE($8, major),
          graduation_year = COALESCE($9, graduation_year),
          career_interests = COALESCE($10, career_interests),
          skills = COALESCE($11, skills)
      WHERE id = $12
      RETURNING id, email, first_name, last_name, user_type, theme, bio, background, location, education_level, current_school, major, graduation_year, career_interests, skills
    `;
    const values = [
      first_name !== undefined ? first_name : null,
      last_name !== undefined ? last_name : null,
      bio !== undefined ? bio : null,
      background !== undefined ? JSON.stringify(background) : null,
      location !== undefined ? JSON.stringify(location) : null,
      education_level !== undefined ? education_level : null,
      current_school !== undefined ? current_school : null,
      major !== undefined ? major : null,
      graduation_year !== undefined ? graduation_year : null,
      career_interests !== undefined ? career_interests : null,
      skills !== undefined ? skills : null,
      req.user.id
    ];
    
    const result = await pool.query(query, values);
    res.json({
      user: result.rows[0],
      message: 'Profile updated successfully'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error updating profile' });
  }
});

// Update theme
app.put('/api/users/theme', authenticateToken, async (req, res) => {
  const { theme } = req.body;
  if (!theme || (theme !== 'light' && theme !== 'dark')) {
    return res.status(400).json({ message: 'Invalid theme value' });
  }
  
  try {
    await pool.query('UPDATE users SET theme = $1 WHERE id = $2', [theme, req.user.id]);
    res.json({ success: true, theme, message: 'Theme updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error updating theme' });
  }
});

// Search users by email or name
app.get('/api/users/search', authenticateToken, async (req, res) => {
  const { q } = req.query;
  if (!q) return res.json([]);
  
  try {
    const result = await pool.query(
      `SELECT id, email, first_name, last_name, user_type 
       FROM users 
       WHERE id != $1 AND (email ILIKE $2 OR first_name ILIKE $2 OR last_name ILIKE $2) 
       ORDER BY email ASC LIMIT 10`,
      [req.user.id, '%' + q + '%']
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error searching users' });
  }
});

// Health check and mock fallbacks
app.get('/api/matching/alumni', authenticateToken, (req, res) => {
  res.json({
    matches: [
      {
        alumni_id: 'mock_1',
        overall_score: 0.85,
        background_score: 0.8,
        location_score: 0.9,
        interest_score: 0.7,
        skill_score: 0.8,
        career_score: 0.9,
        matching_factors: ['Same hometown', 'Similar background', 'Shared interests']
      },
      {
        alumni_id: 'mock_2',
        overall_score: 0.72,
        background_score: 0.9,
        location_score: 0.6,
        interest_score: 0.8,
        skill_score: 0.7,
        career_score: 0.6,
        matching_factors: ['First-generation students', 'Similar career goals']
      }
    ]
  });
});

app.get('/api/impact/metrics', authenticateToken, (req, res) => {
  res.json({
    students_mentored: 5,
    alumni_connected: 3,
    progress_percentage: 65,
    engagement_score: 78
  });
});

app.get('/api/impact/data', authenticateToken, (req, res) => {
  res.json({
    students_mentored: 5,
    hours_volunteered: 20,
    alumni_connected: 3,
    progress_percentage: 65,
    engagement_score: 78
  });
});

app.get('/api/storyboards/:userId', authenticateToken, (req, res) => {
  res.json({
    storyboard_id: 'mock_storyboard_123',
    user_id: req.params.userId,
    title: 'My Career Journey',
    description: 'This is a mock storyboard',
    timeline_items: [],
    created_at: new Date().toISOString()
  });
});

app.post('/api/storyboards', authenticateToken, (req, res) => {
  res.json({
    storyboard_id: 'mock_storyboard_123',
    ...req.body,
    created_at: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
