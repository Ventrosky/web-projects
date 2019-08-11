export default (req, res, next) => {
    //TODO: is authenticated?
    req.isAdmin = true;
    req.isAuthenticated = true;
    next();
}