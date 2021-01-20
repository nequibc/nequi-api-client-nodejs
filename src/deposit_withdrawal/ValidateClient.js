'use strict';

const axios = require('axios');
const auth = require('../Auth');
const appCfg = require('../AppConf');
const Constants = require('../utils/Constants');

const RestEndpoint = '/agents/v2/-services-clientservice-validateclient';

class ValidateClient {
    static async call() {
        const headers = {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: await auth.getToken(),
            'x-api-key': appCfg.apiKey
        };

        const endpoint = `${appCfg.apiBasePath}${RestEndpoint}`;

        const data = {
            RequestMessage: {
                RequestHeader: {
                    Channel: 'MF-001',
                    RequestDate: '2020-01-17T20:26:12.654Z',
                    MessageID: '1234567890',
                    ClientID: "12345",
                    Destination: {
                        ServiceName: 'RechargeService',
                        ServiceOperation: 'validateClient',
                        ServiceRegion: 'C001',
                        ServiceVersion: '1.4.0'
                    }
                },
                RequestBody: {
                    any: {
                        validateClientRQ: {
                            phoneNumber: '3998764643',
                            value: '10'
                            //value: '0', // Envíe 0 para generar un error
                        }
                    }
                }
            }
        };

        try {
            const response = await axios.request({
                url: endpoint,
                method: 'POST',
                headers,
                data
            });

            if (!!response && response.status === 200 && response.data) {
                const { data } = response;
                const {
                    StatusCode:statusCode = '',
                    StatusDesc:statusDesc = ''
                } = data.ResponseMessage.ResponseHeader.Status;

                if (statusCode === Constants.NEQUI_STATUS_CODE_SUCCESS) {
                    const {
                        customerName = '',
                        availableLimit = ''
                    } = data.ResponseMessage.ResponseBody.any.validateClientRS;

                    console.info(
                        'Cliente validado correctamente\n' +
                        `- Nombre -> ${customerName}\n` +
                        `- Límite disponible -> ${availableLimit}`
                    );
                } else {
                    throw new Error(`Error ${statusCode} = ${statusDesc}`)
                }
            } else {
                throw new Error('Unable to connect to Nequi, please check the information sent.');
            }
        } catch (error) {
            let msgError = '';

            if (error.isAxiosError) {
                const { status = 'Undefined', statusText = 'Undefined' } = error.response;

                msgError = `Axios error ${status} -> ${statusText}`;

                throw new Error(msgError);
            } else {
                throw error;
            }

        }
    }
}

(async function() {
    try {
        await ValidateClient.call();
    } catch (error) {
        console.error(`Depósitos y Retiros -> Error validando cliente -> '${error.message}'`);
    }
}());