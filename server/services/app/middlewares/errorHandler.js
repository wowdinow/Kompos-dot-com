

function errorHandler(err, req, res, next){
    let status = err.status || 500
    let message = err.msg || "Internal Server Error"

    console.log(err);
    switch(err.name){
        case "Unathorized":
            status = 401
            message = "User not found"
        break;
        case "Email/Password is required":
            status = 400
            message = "Email/Password is required"
        break;
        case "SequelizeValidationError":
            status = 400
            message = err.errors[0].message
        break;
        case "SequelizeUniqueConstraintError":
            status = 400
            message = err.errors[0].message
        break;
        case "NotFound":
            status = 404
            message = "Not found"
        break;
        case "JsonWebTokenError":
            status = 401
            message = "Invalid Token"
        break;
        case "Forbidden":
            status = 403
            message = "Forbidden"
        break
    }

    res.status(status).json({message: message})
}

module.exports = errorHandler