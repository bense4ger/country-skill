"use strict";
const languageStrings = require('../../lib/language-strings');
const responder = require('../../lib/responder');

describe('success', () => {
    let country = 'foo', capital = 'bar';
    let capitalResult, countryResult, capitalExpected, countryExpected;
    beforeAll(() => {
        capitalExpected = `The capital of ${country} is ${capital}`;
        countryExpected = `The country with the capital city ${capital} is ${country}`;
        capitalResult = responder.success(languageStrings['en-GB']['CAPITAL_RESPONSE'], country, capital);
        countryResult = responder.success(languageStrings['en-GB']['COUNTRY_RESPONSE'], country, capital);
    });
    it('should correctly respond to a capital city request', () => {
        expect(capitalResult).toEqual(capitalExpected);
    });
    it('should correctly respond to a country request', () => {
        expect(countryResult).toEqual(countryExpected);
    });
});