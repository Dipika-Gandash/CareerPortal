import jwt from "jsonwebtoken";

export const isAuthenticated = (req, res, next) => {
    const token = req.cookies.token;
    if( !token ) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized access"
        })
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        
    } catch(error) {

    }
}