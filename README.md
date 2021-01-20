# nequi-api-client-nodejs #

### Ejemplo para el consumo del API de Nequi en NodeJS  ###

El propósito de este ejemplo es ilustrativo para aquellos interesados en la integración con el API de Nequi. Con este ejemplo podrá consumir algunos de los recursos ofrecidos por el API,y si lo desea podrá utilizar este código como base para el consumo del resto de recursos expuestos en el API. Para más información visite nuestro portal para desarrolladores [https://conecta.nequi.com.co](https://conecta.nequi.com.co "Nequi Conecta").

## 1. Preparación del ambiente

### Credenciales de acceso

Asegúrese de tener las credenciales necesarias para hacer el consumo del API, los datos mínimos que debe tener son:
- Client Id
- Client Secret
- API Key

Los anteriores datos los podrá encontrar en la sección **Credenciales** en el siguiente enlace [https://conecta.nequi.com/content/consultas](https://conecta.nequi.com/content/consultas "Nequi Conecta").

### Archivo de configuración

En el archivo ```/app.example.env``` podrá encontrar un ejemplo de las credenciales que debe proveer. Además también encontrará algunas definiciones adicionales que se usan en los ejemplos.

*Tenga en cuenta que los ejemplos toman como premisa que las credenciales y las definiciones adicionales están almacenadas en **variables de entorno**.*

### Librería 'axios'

Todos los ejemplos aquí proporciandos usan la librería [Axios](https://www.npmjs.com/package/axios) para hacer el consumo de los endpoints. Usted y su equipo de desarrollo es libre de usar cualquier librería que le provea una abstracción para el consumo de APIs Restful o de crear su propio código para dicha integración.

## 2. Ejemplos de integración

Recuerde que podrá encontrar el detalle de los recursos ofrecidos por el API en el siguiente enlace [https://docs.conecta.nequi.com.co/](https://docs.conecta.nequi.com.co/).

### Autenticación en Nequi Conecta

En el archivo ```/src/Auth.js``` podrá encontrar el código necesario para autenticarse, el cual le permite obtener un token de acceso que deberá usar en las integraciones del API.

### Pagos con QR code

Esta sección cuenta con 1 ejemplos que podrá encontrar alojado en la carpeta ```/src/payment/```.

- **Generar pago**: En el archivo ```/src/payment/GenerateQR.js``` podrá encontrar el código para generar un pago con código QR.

### Depósitos y Retiros

Esta sección cuenta con 2 ejemplos que podrás encontrar alojado en la carpeta ```/src/deposit_withdrawal/```.

- **Validar una cuenta**: En el archivo ```/src/deposit_withdrawal/ValidateClient.js``` podrá encontrar el código para validar una cuenta.

- **Recargar una cuenta**: En el archivo ```/src/deposit_withdrawal/ChargeAccount.js``` podrá encontrar el código para recargar una cuenta.

### Pagos con notificación

Esta sección cuenta con 1 ejemplo que podrá encontrar alojado en la carpeta ```/src/payment_push/```.

- **Solicitu de pago**: En el archivo ```/src/payment_push/UnregisteredPaymentRequest.js``` podrá encontrar el código para solicitar un pago mediante notificación push.

## 3. Ejecutar los ejemplos

Para ver en funcionamiento de los ejemplos primero asegúrese de tener NodeJs instalado con una versión igual o superior a ```12.14.0```, luego descargue los fuentes, instale las dependencias usando el comando ```npm install``` desde la raíz del proyecto y finalmente cree(y ajuste los valores) en la raíz del proyecto el archivo ```/app.env``` tomando como base el archivo ```/app.example.env```.

Si todo es correcto, ejecute ```node src/index.js``` para verificar que las variables de entorno se leen correctamente. Para probar los ejemplos ejecute ```node src/{carpeta/del/archivo}/{archivo}.js``` reemplazando los valores que están entre llaves por las carpeta o archivo correspondiente, ejemplo ```node src/deposit_withdrawal/ValidateClient.js```.

## 4. Información adicional

- Carpeta ```/src/utils/```: Aquí podrá encontrar funciones que se reusan en los ejemplos de integración, y constantes para validar resultados del API.

----------
*Made with ♥ at Nequi*

