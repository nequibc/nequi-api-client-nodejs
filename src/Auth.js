'use strict';

const Moment = require('moment');
const axios = require('axios');
const appCfg = require('./AppConf');

class Auth {
    token = null;
    tokenType = null;
    expiresAt = null;

    constructor() {}

    async auth() {
        try {
            const authorization = `Basic ${Buffer.from(`${appCfg.clientId}:${appCfg.clientSecret}`).toString('base64')}`;

            const headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
                'Authorization': authorization
            };

            const endpoint = `${appCfg.authUri}?grant_type=${appCfg.authGrantType}`;

            try {
                const response = await axios.request({
                    url: endpoint,
                    method: 'POST',
                    headers
                });

                if (!!response && response.status === 200 && response.data) {
                    this.token = response.data.access_token;
                    this.tokenType = response.data.token_type;
                    this.expiresAt = Moment(new Date()).add(response.expires_in, 'seconds');
                } else {
                    throw new Exception('Unable to connect to Nequi, please check the information sent.');
                }
            } catch (error) {
                let msgError = '';

                if (error.isAxiosError) {
                    const { status = 'Undefined', statusText = 'Undefined' } = error.response;

                    msgError = `Axios error ${status} -> ${statusText}`;
                } else {
                    msgError = `Error -> ${error}`;
                }

                throw new Error(msgError);
            }
        } catch (e) {
            throw new Error('Unable to auth to Nequi, please check the information sent.');
        }
    }

    async getToken(full = true) {
        if (!this.isValidToken()) {
            await this.auth();
        }

        return full ? `${this.tokenType} ${this.token}` : this.token; 
    }

    isValidToken() {
        if (!this.expiresAt) {
            return false;
        }

        return Moment().isBefore(this.expiresAt);
    }
}

module.exports = new Auth();