
const tokenConfig = require('../config/token.js');
const crypto = require('crypto');
var cryptoJs = require("crypto-js");

const getAutherizationHeaderValues = function(raw){
    let credArray = raw.split(':');
    console.log(credArray);
    if (credArray.length == 4){
        return credArray;
    }else{
        return null;
    }
  }

const computeHash = function(content){
    let text = content.replace(/:/g,': ').replace(/,/g,', ');
    let md5sum = crypto.createHash('md5');
    md5sum.update(new Buffer(text, 'utf8'));
    md5val = md5sum.digest('hex');
    return md5val;
}

const isValidRequest = function(req, APPId, base64Signature, nonce, requestTimeStamp){
  if (tokenConfig.app_id !== APPId){
   return false;
  }
  let sharedKey = tokenConfig.app_key;
  let hashData = computeHash(JSON.stringify(req.body));
  let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  requestUri = encodeURIComponent(fullUrl).toLowerCase();
  requestMethod = req.method;
  data = `${APPId}${requestMethod}${requestUri}${requestTimeStamp}${nonce}${hashData}`;
  let hash = cryptoJs.HmacSHA256(data, sharedKey).toString(cryptoJs.enc.Hex);
  return (base64Signature == hash);
}

module.exports = function(req,res,next) {
  let authHeader = req.headers['authorization'];
  console.log(authHeader);
  if ((authHeader == undefined) || (authHeader.substr(0, authHeader.indexOf(' ')) !== "amx")){
    return res.status(403).send({
        "error": true
    });
  }
  let rawAuthzHeader = authHeader.substr(authHeader.indexOf(' ')+1);
  console.log(rawAuthzHeader);
  let authArray = getAutherizationHeaderValues(rawAuthzHeader);
  if (authArray == null){
    return res.status(403).send({
        "error": true
    });
  }
  let APPId = authArray[0];
  let base64Signature = authArray[1];
  let nonce = authArray[2];
  let requestTimeStamp = authArray[3];

  let isValid = isValidRequest(req, APPId, base64Signature, nonce, requestTimeStamp);
  if (!isValid){
    return res.status(403).send({
        "error": true
    });
  }

    next();
}