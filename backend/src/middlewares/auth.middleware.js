/* eslint-disable import/prefer-default-export */
import jwtoken from 'jsonwebtoken';

export const jwtAuthenticate = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) {
    return res.status(401).json({ error: 'Not authorization' });
  }
  try {
    const verification = jwtoken.verify(
      token,
      process.env.JWT_SECRET,
    );
    req.user = verification;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid Token' });
  }
};
