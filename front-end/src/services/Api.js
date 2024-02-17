import {isSet} from "./util";

const JSON_MEDIA = 'application/json';
const JSON_GET = {method: 'GET', headers: {'Accept': JSON_MEDIA}};
const JSON_HEADERS = {'Accept': JSON_MEDIA, 'Content-Type': JSON_MEDIA};
const JSON_POST = {method: 'POST', headers: JSON_HEADERS};
const JSON_PUT = {method: 'PUT', headers: JSON_HEADERS};
const JSON_DELETE = {method: 'DELETE', headers: JSON_HEADERS};

export default class Api {
    static setBaseUrl(newBaseUrl) {
        Api.baseUrl = newBaseUrl;
        console.log(`baseUrl UPDATED:${Api.baseUrl}`);
    }
    static getApiBaseUrl() {
        return `${Api.baseUrl}`;
    }

    static about() {
        return Api.simpleFetch(`${this.getApiBaseUrl()}/about`);
    }

    static simpleFetch(apiEndpoint) {
        return new Promise((resolve, reject) => {
            fetch(apiEndpoint, JSON_GET)
                .catch(reject)
                .then(response => response.json())
                .then(response => resolve(response));
        });
    }

    static _jsonPostBody(body, token = null) {
        let options = JSON_POST;
        options.body = JSON.stringify(body);
        if (isSet(token)) {
            options.headers["x-token"] = token;
        }
        return options;
    }

    static _jsonPutBody(body) {
        let options = JSON_PUT;
        options.body = JSON.stringify(body);
        return options;
    }

    static _jsonDeleteBody(body) {
        let options = JSON_DELETE;
        options.body = JSON.stringify(body);
        return options;
    }

    static async _response(response, resolve, reject) {
        const responseString = await response.text();
        try {
            const responseParsed = JSON.parse(responseString);
            console.log("response", response.status, responseParsed);
            response.ok ? resolve(responseParsed) : reject(responseParsed);
        } catch (error) {
            console.log("(not json) response", response.status, responseString);
            response.ok ? resolve(responseString) : reject(responseString);
        }
    }

}
Api.baseUrl = "http://not-initialized-backend.localhost:4321";