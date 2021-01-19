require('dotenv').config({ path: '../app.env' });

class AppConf {
    clientId = null;
    clientSecret = null;
    apiKey = null;
    authUri = null;
    authGrantType = null;
    apiBasePath = null;

    constructor() {
        this.loadEnvVars();
    }

    loadEnvVars() {
        this.clientId = process.env.NEQUI_CLIENT_ID;
        this.clientSecret = process.env.NEQUI_CLIENT_SECRET;
        this.apiKey = process.env.NEQUI_API_KEY;
        this.authUri = process.env.NEQUI_AUTH_URI;
        this.authGrantType = process.env.NEQUI_AUTH_GRANT_TYPE;
        this.apiBasePath = process.env.NEQUI_API_BASE_PATH;
    }
}

module.exports = new AppConf();