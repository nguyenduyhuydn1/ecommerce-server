import jwt from 'jsonwebtoken';

export const verifyToken = (req) => {
    const token = req?.headers?.authorization?.split(' ')[1];

    return jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) return false;
        return decoded;
    });
};
