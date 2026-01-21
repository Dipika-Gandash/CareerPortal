
export const isRecruiter = (req, res, next) => {
    if(req.user.role !== 'recruiter') {
        return res.status(403).json({
            success: false,
            message: "Access denied, recruiters only"
        })
    }
    next();
}

export const isAdmin = (req, res, next) => {
    if(req.user.role !== 'admin'){
        return res.status(403).json({
            success: false,
            message: "Access denied, admins only"
        })
    }
    next();
}

export const isJobSeeker = (req, res, next) => {
    if(req.user.role !== 'jobseeker'){
        return res.status(403).json({
            success: false,
            message: "Access denied, jobseeker only"
        })
    }
    next();
}