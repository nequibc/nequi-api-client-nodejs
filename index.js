'user strict';
/**
 * @module nequi-api-client
 * @description Ejemplo que usa el cliente del API
 * @author      <jomgarci@bancolombia.com.co>
 * @version     0.0.1
*/

  const clientAPI = require('./clientAPI.js');

  clientAPI.validateClient('3195414070', '0').then((result) =>{
  	  console.log('Resultado del servicio de validación de cliente');
      console.log(result);
  }, (error) =>{
  	  console.log('Error consumiendo API');
      console.log(error);
  });