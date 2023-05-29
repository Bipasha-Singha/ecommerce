/*function check_user_admin(req, res, next) {
    if (!req.user.isAdmin) {
      return res.status(403).json({ error: 'Access denied. You are not set to admin!!!' });
    }
    next();
  }
  module.exports = { check_user_admin };*/
 module.exports = (thefun) => (req, res, next) =>{
  Promise.resolve(thefun(req,res,next)).catch(next);
 };
  