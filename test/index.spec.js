const {expect} = require('chai');

const index = require('../src/index');

describe('index ', () => {

    const context = {
        "callbackWaitsForEmptyEventLoop": true,
        "logGroupName": "/aws/lambda/insolvenz",
        "logStreamName": "2017/08/25/[$LATEST]77fa4eeaf29c4236b245ddecd0d60f59",
        "functionName": "insolvenz",
        "memoryLimitInMB": "128",
        "functionVersion": "$LATEST",
        "invokeid": "061790c7-89ab-11e7-9c2a-77369c97c24b",
        "awsRequestId": "061790c7-89ab-11e7-9c2a-77369c97c24b",
        "invokedFunctionArn": "arn:aws:lambda:eu-west-1:866598298655:function:insolvenz"
    };

    const event = {
        "session": {
            "new": true,
            "sessionId": "?",
            "application": {
                "applicationId": "amzn1.ask.skill.fb607e9d-e998-46f2-8b02-1d2d25d2513b"
            },
            "attributes": {},
            "user": {
                "userId": "amzn1.ask.account.AGSEFIPIOFHNNFB6RTAEC7Q7NBA5YDADWXFBAVH5MVM4IQQJULTCSWSQG63Y3SML224TCJGYQUVYNNNJPPLQFCZU2CAQR62KEHYFRJIZEHQIPMIRQOD66V74Q3WKPTWL2F4FWJI5RAFLVATE2UBZ2ZJV5KX7R7KKLAK5HULCSHWPAR7EQ3OPQSVGPBEPMLQ7UIWZM3VWUQDQHCY"
            }
        },
        "request": {
            "type": "LaunchRequest",
            "requestId": "EdwRequestId.e5901fa9-2075-4a06-aa35-06ef3d0268d1",
            "locale": "de-DE",
            "timestamp": "2017-08-22T05:18:18Z"
        },
        "context": {
            "AudioPlayer": {
                "playerActivity": "IDLE"
            },
            "System": {
                "application": {
                    "applicationId": "amzn1.ask.skill.fb607e9d-e998-46f2-8b02-1d2d25d2513b"
                },
                "user": {
                    "userId": "amzn1.ask.account.AGSEFIPIOFHNNFB6RTAEC7Q7NBA5YDADWXFBAVH5MVM4IQQJULTCSWSQG63Y3SML224TCJGYQUVYNNNJPPLQFCZU2CAQR62KEHYFRJIZEHQIPMIRQOD66V74Q3WKPTWL2F4FWJI5RAFLVATE2UBZ2ZJV5KX7R7KKLAK5HULCSHWPAR7EQ3OPQSVGPBEPMLQ7UIWZM3VWUQDQHCY"
                },
                "device": {
                    "supportedInterfaces": {}
                }
            }
        },
        "version": "1.0"
    };

    before(() => {
        "use strict";
    });

    xit('?', () => {

        index.handler(event, context);

        //const output = speech.createSpeechOutput(mock_handlers, data);
        //expect(output).to.include(data[0].name);
    });
});



