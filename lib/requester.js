"use strict";
const url = require('url');
const request = require('request');
const resources = require('./resources');

module.exports = {
    /**
     * @protected
     * @function getCapitalByCountry
     * @param {string} name The country name
     * @returns {Promise}
     */
    getCapitalByCountry: function getCapitalByCountry (name) {
        return new Promise((resolve, reject) => {
            if(!name) reject('No capital passed');
            const requestUrl = url.resolve(resources.base, resources.paths.getCountry);

            request(`${requestUrl}/${name}`, (err, response, body) => {
                if(!err){
                    if(response.statusCode === 200 || response.statusCode === 404) {
                        resolve(JSON.parse(body));
                    }

                    reject(body);
                }
                else {
                    reject(err);
                }
            });
        });
    },

    /**
     * @protected
     * @function getCountryByCapital
     * @param {string} name
     * @returns {Promise}
     */
    getCountryByCapital: function getCountryByCapital (name) {
        return new Promise((resolve, reject) => {
            if(!name) reject('No capital passed');
            const requestUrl = url.resolve(resources.base, resources.paths.getCapital);

            request(`${requestUrl}/${name}`, (err, response, body) => {
                if(!err){
                    if(response.statusCode === 200 || response.statusCode === 404) {
                        resolve(JSON.parse(body));
                    }

                    reject(body);
                }
                else {
                    reject(err);
                }
            });
        });
    }
};