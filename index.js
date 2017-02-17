"use strict";
const Alexa = require('alexa-sdk');
const requester = require('./lib/requester');
const responder = require('./lib/responder');
const logger = require('./lib/logger');

const logInfo = (data) => {
    logger.log('INFO', data);
};
const logErr = (data) => {
    logger.log('ERR', data);
};

const handlers = {
    'LaunchRequest': function () {
       const welcome = this.t('WELCOME_MESSAGE');
       const repromt = this.t('WELCOME_REPROMPT');
       
       this.emit(':ask', welcome, repromt);
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t('HELP_MESSAGE');
        const reprompt = this.t('HELP_MESSAGE');
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'Unhandled': function () {
        logErr('Unhandled');
        logErr(this.args);
        this.emit(':tell', this.t('ERR_MESSAGE'));
    },
    'GetCapitalIntent': function () {
        logInfo('GetCapitalIntent');
        try {
            const country = this.event.request.intent.slots.country.value;
            logInfo(`GetCapitalIntent: ${country}`);

            if (country !== undefined && country !== '') {
                requester.getCapitalByCountry(country)
                    .then((response) => {
                        logInfo(response[0]);
                        if (response[0] !== undefined && response[0].capital !== undefined) {
                            const result = responder.success(this.t('CAPITAL_RESPONSE'), country, response[0].capital);
                            logInfo({ result: result });
                            this.emit(':tell', result);

                        } else {
                            this.emit(':tell', responder.failure(this.t('NOT_FOUND_RESPONSE')));
                        }
                    })
                    .catch((err) => {
                        logErr('GetCapitalIntent');
                        logErr(err);
                        this.emit(':tell', this.t('ERR_MESSAGE'));
                    });
            } else {
                logInfo('GetCapitalIntent - empty slot');
                this.emit(':tell', this.t('EMPTY_SLOT_MESSAGE'))
            }
        }
        catch(err) {
            logErr('GetCapitalIntent');
            logErr(err);
            this.emit(':tell', this.t('ERR_MESSAGE'));
        }
    },
    'GetCountryIntent': function () {
        logInfo('GetCountryIntent');
        try {
            const capital = this.event.request.intent.slots.capital.value;
            logInfo(`GetCountryIntent: ${capital}`);
            if (capital !== undefined && capital !== '') {
                requester.getCountryByCapital(capital)
                    .then((response) => {
                        logInfo(response);
                        if (response[0] !== undefined && response[0].name !== undefined) {
                            const result = responder.success(this.t('COUNTRY_RESPONSE'), response[0].name, capital);
                            this.emit(':tell', result);
                        } else {
                            this.emit(':tell', responder.failure(this.t('NOT_FOUND_RESPONSE')));
                        }
                    })
                    .catch((err) => {
                        logErr('GetCountryIntent');
                        logErr(err);
                        this.emit(':tell', this.t('ERR_MESSAGE'));
                    });
            } else {
                logInfo('GetCountryIntent - empty slot');
                this.emit(':tell', this.t('EMPTY_SLOT_MESSAGE'))
            }
        }
        catch(err){
            logErr('GetCountryIntent');
            logErr(err);
            this.emit(':tell', this.t('ERR_MESSAGE'));
        }
    }
};

exports.handler = (event, context, callback) => {
    logInfo('handler');
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = 'amzn1.ask.skill.9b0ef53d-0595-4869-ad22-ced17b902596';
    alexa.resources = require('./lib/language-strings');
    alexa.registerHandlers(handlers);
    logInfo('alexa exectute');
    alexa.execute();
};