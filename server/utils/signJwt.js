import jwt from 'jsonwebtoken';

const signToken = (id,role) => {
  return jwt.sign({ id ,role}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export default signToken;