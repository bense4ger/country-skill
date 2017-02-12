"use strict";
const logType = {
    INFO: (data) => { console.log(data); },
    ERR: (data) => { console.error(data); }
};

module.exports = {
    log: (type, message) => {
        const env = process.env['env'];
        if(env && env === 'prod') {
            const complete = {
                type: type,
                message: message,
                timestamp: new Date().toISOString()
            };

            if (logType[type] !== undefined) {
                logType[type](JSON.stringify(complete));
            }
        }
    }
};