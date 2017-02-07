"use strict";
const nock = require('nock');
const requester  = require('../../lib/requester');
const resources = require('../../lib/resources');

describe('getCapitalByCountry', () => {
    beforeAll(() => {
        const foundResource = `/${resources.paths.getCountry}/foo`;
        const notFoundResource = `/${resources.paths.getCountry}/bar`;
        const errResource = `/${resources.paths.getCountry}/err`;

        const found = nock(resources.base).get(foundResource).reply(200, [{ capital: "London" }]);
        const notFound = nock(resources.base).get(notFoundResource).reply(404, { status: 404, message: "Not Found" });
        const error = nock(resources.base).get(errResource).reply(500);
    });
    it('should return a string if a country is found', (done) => {
        requester.getCapitalByCountry('foo')
            .then((response) => {
                expect(response[0].capital).toEqual("London");
                done();
            })
            .catch((err) => {
                expect(err).toBeUndefined();
                done.fail();
            });
    });
    it('should return "Not Found" if a country is not found', (done) => {
        requester.getCapitalByCountry('bar')
            .then((response) => {
                expect(response.message).toEqual('Not Found');
                done();
            })
            .catch((err) => {
                expect(err).toBeUndefined();
                done.fail();
            });
    });
    it('should reject an error gracefully', (done) => {
        requester.getCapitalByCountry('err')
            .then((response) => {
                expect(response).toBeUndefined();
                done.fail();
            })
            .catch((err) => {
                expect(err).toBeDefined();
                done();
            });
    });
});


describe('getCountryByCapital', () => {
    beforeAll(() => {
        const foundResource = `/${resources.paths.getCapital}/foo`;
        const notFoundResource = `/${resources.paths.getCapital}/bar`;
        const errResource = `/${resources.paths.getCapital}/err`;

        nock(resources.base).get(foundResource).reply(200, [{ name: "United Kingdom" }]);
        nock(resources.base).get(notFoundResource).reply(404, { status: 404, message: "Not Found" });
        nock(resources.base).get(errResource).reply(500);
    });
    it('should return a string if a capital is found', (done) => {
        requester.getCountryByCapital('foo')
            .then((response) => {
                expect(response[0].name).toEqual("United Kingdom");
                done();
            })
            .catch((err) => {
                expect(err).toBeUndefined();
                done.fail();
            });
    });
    it('should return "Not Found" if a capital is not found', (done) => {
        requester.getCountryByCapital('bar')
            .then((response) => {
                expect(response.message).toEqual('Not Found');
                done();
            })
            .catch((err) => {
                expect(err).toBeUndefined();
                done.fail();
            });
    });
    it('should reject an error gracefully', (done) => {
        requester.getCountryByCapital('err')
            .then((response) => {
                expect(response).toBeUndefined();
                done.fail();
            })
            .catch((err) => {
                expect(err).toBeDefined();
                done();
            });
    });
});
