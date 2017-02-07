"use strict";
const Alexa = require('alexa-sdk');
const requester = require('./lib/requester');
const responder = require('./lib/responder');

const handlers = {
    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t("HELP_MESSAGE");
        const reprompt = this.t("HELP_MESSAGE");
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t("STOP_MESSAGE"));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t("STOP_MESSAGE"));
    },
    'getCapitalIntent': function () {
        const country = this.event.request.slots.country.value;
        if(country !== undefined && country !== '') {
            requester.getCapitalByCountry(country)
                .then((response) => {
                    if(response.capital) {
                        const result = responder.success(this.t('CAPITAL_RESPONSE'), country, response.capital);
                        this.emit(':tell', result);

                    } else {
                        this.emit(':tell', responder.failure(this.t('NOT_FOUND_RESPONSE')));
                    }
                })
                .catch((err) => {
                    this.emit(':tell', this.t('ERR_MESSAGE'));
                });
        } else {
            this.emit(':tell', this.t('EMPTY_SLOT_MESSAGE'))
        }
    },
    'getCountryIntent': function () {
        const capital = this.event.request.slots.capital.value;
        if(capital !== undefined && capital !== '') {
            requester.getCountryByCapital(capital)
                .then((response) => {
                    if(response.name) {
                        const result = responder.success(this.t('COUNTRY_RESPONSE'), country, response.capital);
                        this.emit(':tell', result);
                    } else {
                        this.emit(':tell', responder.failure(this.t('NOT_FOUND_RESPONSE')));
                    }
                })
                .catch((err) => {
                    this.emit(':tell', this.t('ERR_MESSAGE'));
                });
        } else {
            this.emit(':tell', this.t('EMPTY_SLOT_MESSAGE'))
        }
    }
};

exports.handler = (event, context, callback) => {
    const alexa = Alexa.handler(event, context);
    alexa.resources = require('./lib/language-strings');
    alexa.registerHandlers(handlers);
    alexa.execute();
};