'use strict';
const Alexa = require('alexa-sdk');
const insolvenz = require('insolvenz');
const speech = require('speech');
const APP_ID = 'amzn1.ask.skill.fb607e9d-e998-46f2-8b02-1d2d25d2513b';

const languageStrings = {
    'de-DE': {
        'translation': {
            'SKILL_NAME': 'insolvenz',
            'NOT_FOUND_MESSAGE': 'Ich habe keinen Eintrag gefunden. ',
            'FOUND_MESSAGE': 'Ich habe %d Einträge gefunden. <break time="1s" ',
            'QUESTION_READ_MESSAGE': 'Soll ich Dir die Einträge vorlesen?',
            'INTRO_MESSAGE': 'Ich habe die folgenden Einträge gefunden. <break time="1s"/>',

            'PERSON_MESSAGE': 'Eintrag von Person ',
            'TOWN_MESSAGE': 'in Stadt ',
            'TREATMENT_MESSAGE': 'hat Verfahrensnummer ',

            'FIRM_MESSAGE': 'Eintrag von Firma ',
            'REGISTER_MESSAGE': 'mit Handelsregisternummer ',
            'COURT_MESSAGE': 'Gericht ',

            'ENTRY_MESSAGE': 'Eintrag ',

            'EXTRO_MESSAGE': 'Ende der Liste. ',

            'HELP_MESSAGE': "Du kannst mich nach Insolvenzdaten fragen. ",
            'HELP_REPROMPT': "Was möchtest Du wissen? ",
            'STOP_MESSAGE': 'Tschüss '
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

const handlers = {
    'LaunchRequest': function () {
        this.emit('WhoIsInsolvent');
    },

    'WhoIsInsolvent': function () {
        insolvenz.initialise();
        insolvenz.whoIsInsolvent((insolvenzData) => {
            const speechOutput = speech.createSpeechOutput(this, insolvenzData);
            this.emit(':tellWithCard', speechOutput, this.t('SKILL_NAME'), speechOutput);
        });
    },

    'WhoIsInsolventFromDate': function () {
        const dateFromRequest = this.event.request.intent.slots.date.value;
        const dateParts = dateFromRequest.split('-');
        const date = dateParts[2] + '.' + dateParts[1] + '.' + dateParts[0];
        insolvenz.initialise();
        insolvenz.whoIsInsolventFromDate(date, (insolvenzData) => {
            const speechOutput = speech.createSpeechOutput(this, insolvenzData);
            this.emit(':tellWithCard', speechOutput, this.t('SKILL_NAME'), speechOutput);
        });
    },

    'IsNameInsolvent': function () {
        const name = this.event.request.intent.slots.name.value;
        insolvenz.initialise();
        insolvenz.isNameInsolvent(name, (insolvenzData) => {
            const speechOutput = speech.createSpeechOutput(this, insolvenzData);
            this.emit(':tellWithCard', speechOutput, this.t('SKILL_NAME'), speechOutput);
        });
    },

    'WhoIsInsolventInTown': function () {
        const town = this.event.request.intent.slots.town.value;
        insolvenz.initialise();
        insolvenz.whoIsInsolventInTown(town, (insolvenzData) => {
            const speechOutput = speech.createSpeechOutput(this, insolvenzData);
            this.emit(':tellWithCard', speechOutput, this.t('SKILL_NAME'), speechOutput);
        });
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


