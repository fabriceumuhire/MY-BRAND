const asynchandler = (fun) => (req, res, next) => Promise.resolve(fun(req, res, next)).catch(error=>{
    console.log(error);
    if (error.name == "CastError") {
        return res.status(404).send({ error: "Resource not found"});
    }
    if (error.message === null) {
        const message = "Article doesn't exist"
        return Response.error(res, 404, message, error);
    }
    if (error.code === 40) {
        const message = "Image doesn't exist"
        return Response.error(res, 400, message, error);
    }
    if (error.message == "No authorization") {
        return Response.error(res, 401, "Please login/signup", error);
    }

    if (error.name == "Error [ERR_HTTP_HEADERS_SENT]") {
        return res.status(404).send({ error: "Server error"});
    }
    Response.error(res, error.statusCode, error.message, error);
    return next();
});

module.exports = asynchandler;