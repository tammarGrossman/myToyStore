const asyncWrap = (asyncFunction) => {
    return (req, res, next) => {
      asyncFunction(req, res,next)
      .catch(next);
    };
  };
module.exports=asyncWrap
