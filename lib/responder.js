"use strict";
module.exports = {
    /**
     * @protected
     * @function success
     * @param {string} rawMessage
     * @param {string} country
     * @param {string} capital
     * @returns {string}
     */
    success: function success(rawMessage, country, capital) {
        return rawMessage.replace('{country}', country).replace('{capital}', capital);
    },

    /**
     * @protected
     * @function failure
     * @param {string} rawMessage
     * @returns {string}
     */
    failure: function failure(rawMessage) {
        //For now this just returns the message.  May be extended in future
        return rawMessage;
    }
};