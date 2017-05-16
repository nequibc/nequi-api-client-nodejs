const https = require('https');
const aws4  = require('aws4');
const keys = require('./keys');
var awsSigner = {
    makeSignedRequest:makeSignedRequest
};

module.exports = awsSigner;

const ACCESS_KEY = keys.ACCESS_KEY;
const SECRET_KEY = keys.SECRET_KEY;
const API_KEY = keys.API_KEY;

/**
 * @description Funcion para hacer una petición al API de Nequi
 * @author jomgarci@bancolombia.com.co 
 */
function makeSignedRequest(host, path, method, headers, body, onSuccess, onError){
    delete headers['X-Amz-Date'];
    delete headers['Host'];
    delete headers['Content-Length'];
    delete headers['Authorization'];    
    headers['x-api-key'] = API_KEY;
    var options = {
      host: host,
      path: path,
      method: method,
      headers: headers,
      service: 'execute-api',
      body: JSON.stringify(body)
    };     
    options = aws4.sign(options, {accessKeyId: ACCESS_KEY, secretAccessKey: SECRET_KEY});   
    callback = function(response) {
        delete headers['X-Amz-Date'];
        delete headers['Host'];
        delete headers['Content-Length'];
        delete headers['Authorization'];
        delete headers['x-api-key'];
        var responseString = '';
         response.on('data', function(chunk)  {
            responseString += chunk;
        });
      
        response.on('end',  function()  {
            if(!!onSuccess){
                var r;
                try{ 
                    r = JSON.parse(responseString);
                }catch(e){ 
                    r = responseString;
                }
                onSuccess(response.statusCode, r, response);
            }                      
        });
    }
    
    var req = https.request(options, callback);  
    if(!!body){
        req.write(JSON.stringify(body));
    }

    req.on('error', function(e)  { 
        if(!!onError){
            onError(e);
        }
    });
    
    req.end();
}