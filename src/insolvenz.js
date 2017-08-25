const fs = require('fs');
const url = require('url');
const https = require("https");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const _ = require('lodash/core');
const iconv = require('iconv-lite');

exports = Object.assign(exports,
    { initialise, whoIsInsolvent, isNameInsolvent, whoIsInsolventFromDate, whoIsInsolventInTown });

let insolvenzUrl = 'https://www.insolvenzbekanntmachungen.de/cgi-bin/bl_suche.pl';
let fromFile;

function initialise(fileUrl) {
    "use strict";
    //console.log('fileUrl', fileUrl);
    fromFile = !!fileUrl;
    insolvenzUrl = fileUrl || insolvenzUrl;
}

function whoIsInsolvent(callback, name = '', date = '', town = '') {
    //"use strict";
    getHTMLPageInsolvenz((data) => {
        const dom = new JSDOM(data);
        const allPlain = _.map(_.values(dom.window.document.querySelectorAll("table li ul")), (node) => node.textContent);
        const allData = extractData(allPlain);

        //console.log('dom', all);
        callback(allData);
    }, name, date, town);
}

function isNameInsolvent(name, callback) {
    return whoIsInsolvent(callback, name);
}

function whoIsInsolventFromDate(date, callback) {
    return whoIsInsolvent(callback, '', date);
}

function whoIsInsolventInTown(town, callback) {
    return whoIsInsolvent(callback, '', '', town);
}

function getHTMLPageInsolvenz(callback, name = '', date = '', town = '') {
    //"use strict";
    return fromFile ? getInsolvenzDataFromFile(callback) : getInsolvenzDataFromWeb(callback, name, date, town);
}

function getInsolvenzDataFromFile(callback) {
    "use strict";
    fs.readFile(insolvenzUrl, (error,data) => error ?
        (console.log('ERROR', error), callback()) : callback(data) );
}

function getInsolvenzDataFromWeb(callback, name, date, town) {
    //"use strict";

    const urlParts = url.parse(insolvenzUrl);

    const postData = stringify({
        Suchfunktion: 'uneingeschr',
        Absenden: 'Suche',
        Bundesland: '--+Alle+Bundesl%E4nder+--',
        Gericht: '--+Alle+Insolvenzgerichte+--',
        Datum1: date,
        Datum2: date,
        Name: name,
        Sitz: town,
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
        hostname: urlParts.host,
        path: urlParts.pathname,
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

        let data = [];
        response
            .on('data', chunk => data.push(chunk))
            .on('end', () => callback(iconv.decode(Buffer.concat(data), 'win1252')));
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

    Object.keys(postRequestParameter).forEach(key => {
        requestParameterAsString += key + '=' + postRequestParameter[key] + '&';
    });

    return requestParameterAsString;
}

function extractData(allPlain) {
    "use strict";
    //console.log('allPlain', allPlain);
    return _.map(allPlain, plainEntry => {
        //console.log('plainEntry', plainEntry);
        const plainEntryParts = plainEntry.split(',');
        //console.log('plainEntryParts', plainEntryParts);
        if (plainEntryParts.length === 3) {
            return {
                type: 'person',
                name: plainEntryParts[0].trim(),
                town: plainEntryParts[1].trim(),
                treatment: plainEntryParts[2].trim()
            };
        } else if (plainEntryParts.length === 4) {
            return {
                type: 'person',
                name: plainEntryParts[1].trim() + ' ' + plainEntryParts[0].trim(),
                town: plainEntryParts[2].trim(),
                treatment: plainEntryParts[3].trim()
            };
        } else if (plainEntryParts.length === 5) {
            return {
                type: 'firm',
                name: plainEntryParts[0].trim(),
                town: plainEntryParts[1].trim(),
                treatment: plainEntryParts[2].trim(),
                court: plainEntryParts[3].trim(),
                register: plainEntryParts[4].trim()
            };
        } else {
            return {
                type: '?',
                all: plainEntry.trim()
            };
        }
    });
}