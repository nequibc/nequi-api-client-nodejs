'user strict';
/**
 * @module clientAPI
 * @description Expone como funciones el consumo de los recursos del API de Nequi
 * @author      <jomgarci@bancolombia.com.co>
 * @version     0.0.1
*/

const Q = require('q');
const awsSigner = require('./awsSigner.js');

module.exports = {
	//Valida que un cliente NEQUI exista
	validateClient:validateClient
};

const CHANNEL = "MF-001";

const API_RESOURCES = {
    host: 'a7zgalw2j0.execute-api.us-east-1.amazonaws.com',
    services : {
        validateClient : '/qa/-services-clientservice-validateclient'
    },
    headers:{            
        'content-type' : 'application/json'
    }   
};

/**
 * Encapsula el consumo del servicio de validacion de cliente del API y retorna la promesa con la respuesta del servicio
 */
function validateClient(phoneNumber, value){
  return Q.Promise((resolve, reject) =>{
  	var body = getBodyValidateClient(phoneNumber, value);
  	awsSigner.makeSignedRequest(API_RESOURCES.host,
  	  API_RESOURCES.services.validateClient, 'POST',
  	  API_RESOURCES.headers, body,
  	  (statusCode, result) =>  {      
  	      //Status HTTP
  	      console.log(statusCode);  	      
          resolve(result);
  	  }, (error) =>  {  	     
         reject(error); 
      });
  });
}

/**
 * Forma el cuerpo para consumir el servicio de validación de cliente del API
 */
function getBodyValidateClient(phoneNumber, value){
	var messageId = new Date().getTime().toString();
    return {
      "RequestMessage": {
        "RequestHeader": {
          "Channel": CHANNEL,
          "RequestDate": new Date().toJSON(),
          "MessageID": messageId.substring(messageId.length-9),
          "ClientID": phoneNumber.toString(),          
          "Destination": {
            "ServiceName": "RechargeService",
            "ServiceOperation": "validateClient",
            "ServiceRegion": "C001",
            "ServiceVersion": "1.0.0"
          }
        },
        "RequestBody": {
          "any": {
            "validateClientRQ": {
              "phoneNumber": phoneNumber.toString(),
              "value": value.toString()
            }
          }
        }
      }
    }
}