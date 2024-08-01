import jwt from 'jsonwebtoken';
export const verifyToken = (token: string) => {
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        return user;
    }
    catch (error) {
        return null;
    }
};

export const createToken = (user) => {
    console.log(user)
    return jwt.sign({...user}, process.env.JWT_SECRET, {
        expiresIn: '1d'
    });
};
