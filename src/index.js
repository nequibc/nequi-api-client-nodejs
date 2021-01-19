'use strict';

const appCfg = require('./AppConf');

const { clientId, clientSecret, authUri, apiBasePath } = appCfg;

console.log(
    '> Variables de entorno:\n' +
    `- Client Id -> ${clientId}\n` +
    `- Client Secret -> ${clientSecret}\n` +
    `- Auth URI -> ${authUri}\n` +
    `- API Base Path -> ${apiBasePath}\n`
);

console.info(
    clientId && clientSecret && authUri && apiBasePath ? 
    '¡¡¡Felicitaciones!!! La configuración básica es la adecuada.' :
    '¡Hey! Las variables de entorno no están configuradas correctamente, ¿Ya tienes el archivo "/app.env" listo?'
);