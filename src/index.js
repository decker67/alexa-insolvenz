'use strict';
const Alexa = require('alexa-sdk');
const insolvenz = require('insolvenz');
const APP_ID = '';

const languageStrings = {
    'de-DE': {
        'translation': {
            'SKILL_NAME': 'insolvenz',
            'NOT_FOUND_MESSAGE': 'Keinen Eintrag gefunden.',
            'INTRO_MESSAGE': 'Ich habe die folgenden Einträge gefunden. <break time="1s"/>',
            'EXTRO_MESSAGE': 'Ende der Liste.',

            'HELP_MESSAGE': "Du kannst mich nach Insolvenzdaten fragen.",
            'HELP_REPROMPT': "Was möchtest Du wissen?",
            'STOP_MESSAGE': 'Tschüss'
        }
    }
};

exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

/*
in {town}
Stadt {town}

eröffnet am {date}
am {date}
vom {date}
Datum {date}

für {name}
von {name}
Person {name}
Firma {name}
 */
const handlers = {
    'LaunchRequest': function () {
        this.emit('GetInsolvenz');
    },

    'GetInsolvenz': function () {

        insolvenz.initialise();

        insolvenz.whoIsInsolvent((insolvenzData) => {
        });

        insolvenz.isNameInsolvent(name, (insolvenzData) => {
        });

        insolvenz.whoIsInsolventFromDate(date, (insolvenzData) => {

        });

        let speechOutput;
        let result = mensaplan.lunchCard(dateValue);
        if (!result) {
            speechOutput = this.t('NOT_FOUND_MESSAGE');
        } else {
            speechOutput = createSpeechOutput(this, result);
        }

        this.emit(':tellWithCard', speechOutput, this.t('SKILL_NAME'), speechOutput);


    },

    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t(HELP_MESSAGE);
        const reprompt = this.t(HELP_REPROMPT);
        this.emit(':ask', speechOutput, reprompt);
    },

    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t(STOP_MESSAGE));
    },

    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t(STOP_MESSAGE));
    }
};

// function createSpeechOutput(handlers, result) {
//     let output = handlers.t('INTRO_MESSAGE');
//
//     result.forEach(menue => {
//         const category = menue.category;
//         const description = menue.description;
//         const price = menue.price;
//         output += category + ', ' + description + ', ' + (price ? price : '');
//
//         output += '<break time="1s"/>';
//     });
//     output += '<break time="500ms"/>' + handlers.t('EXTRO_MESSAGE');
//
//     return output;
// }
