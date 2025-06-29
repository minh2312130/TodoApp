const jwt = require("jsonwebtoken");
const Account = require("../module/Account");

const checklogin = async (req,res,next)=>{
  var token = req.cookies.token;
  try{
    var decode = jwt.verify(token,process.env.SECRET_KEY);
    Account.findById({_id:decode.id})
    .then(data=>{
      req.decode = decode;
      next();
    })
    .catch(error=>{
      console.error(error);
      res.json("NOT FOUND");
    })

  }
  catch(error){
    console.error(error);
    res.json("need login again");
  }

}

module.exports = {
  checklogin
}