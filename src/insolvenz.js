const fs = require('fs');
const { URL } = require('url');
const querystring = require('querystring');
const https = require("https");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

exports = Object.assign(exports, { initialise, whoIsInsolvent, isNameInsolvent, whoIsInsolventFromDate });

let insolvenzUrl = 'https://www.insolvenzbekanntmachungen.de/cgi-bin/bl_suche.pl';
let fromFile;

function initialise(fileUrl) {
    "use strict";
    //console.log('fileUrl', fileUrl);
    fromFile = !!fileUrl;
    insolvenzUrl = fileUrl || insolvenzUrl;
}

function whoIsInsolvent(callback, name = '', date = '') {
    //"use strict";
    getHTMLPageInsolvenz((data) => {
        const dom = new JSDOM(data);
        const all = Object.values(dom.window.document.querySelectorAll("table li ul"))
            .map((node) => node.textContent);
        //console.log('dom', all);
        callback(all);
    }, name, date);
}

function isNameInsolvent(name, callback) {
    return whoIsInsolvent(callback, name);
}

function whoIsInsolventFromDate(date, callback) {
    return whoIsInsolvent(callback, '', date);
}

function getHTMLPageInsolvenz(callback, name = '', date = '') {
    //"use strict";
    return fromFile ? getInsolvenzDataFromFile(callback) : getInsolvenzDataFromWeb(callback, name, date);
}

function getInsolvenzDataFromFile(callback) {
    "use strict";
    fs.readFile(insolvenzUrl, (error,data) => error ?
        (console.log('ERROR', error), callback()) : callback(data) );
}

function getInsolvenzDataFromWeb(callback, name, date) {
    //"use strict";

    const url = new URL(insolvenzUrl);

    const postData = stringify({
        Suchfunktion: 'uneingeschr',
        Absenden: 'Suche',
        Bundesland: '--+Alle+Bundesl%E4nder+--',
        Gericht: '--+Alle+Insolvenzgerichte+--',
        Datum1: date,
        Datum2: date,
        Name: name,
        Sitz: '',
        Abteilungsnr: '',
        Registerzeichen: '--',
        Lfdnr: '',
        Jahreszahl: '--',
        Registerart: '--+keine+Angabe+--',
        select_registergericht: '',
        Registergericht: '--+keine+Angabe+--',
        Registernummer: '',
        Gegenstand: '--+Alle+Bekanntmachungen+innerhalb+des+Verfahrens+--',
        matchesperpage: 100,
        page: 1,
        sortedby: 'Datum'
    });

    const options = {
        hostname: url.hostname,
        path: url.pathname,
        port: 443,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': postData.length
        }
    };

    const request = https.request(options, (response) => {
        //console.log('statusCode:', response.statusCode);
        //console.log('headers:', response.headers);

        let data = '';
        response
            .on('data', (chunk) => data += chunk)
            .on('end', () => callback(data));
        request.on('error', (e) => {
            console.error(e);
        });
    });

    request.write(postData);
    request.end();
}

function stringify(postRequestParameter) {
    "use strict";
    let requestParameterAsString = '';

    Object.keys(postRequestParameter).forEach((key) => {
        requestParameterAsString += key + '=' + postRequestParameter[key] + '&';
    });

    return requestParameterAsString;
}