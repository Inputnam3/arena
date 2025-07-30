
import { Router } from 'express';

const authRouter = Router();

authRouter.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Input validation
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  // Simulated authentication logic
  if (password === 'admin') {
    // In a real app, you would generate a JWT here
    const fakeToken = 'fake-jwt-token';
    let profile = 'aluno';
    if (email === 'admin@test.com') {
      profile = 'admin';
    } else if (email === 'professor@test.com') {
      profile = 'professor';
    }
    return res.json({ token: fakeToken, profile });
  } else {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }
});

export default authRouter;
