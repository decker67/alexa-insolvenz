'use strict';
const Alexa = require('alexa-sdk');
const insolvenz = require('./insolvenz');
const speech = require('./speech');
const APP_ID = 'amzn1.ask.skill.fb607e9d-e998-46f2-8b02-1d2d25d2513b';

const languageStrings = {
    'de-DE': {
        'translation': {
            'SKILL_NAME': 'insolvenz',
            'NOT_FOUND_MESSAGE': 'Ich habe keinen Eintrag für %s gefunden. ',
            'FOUND_MESSAGE': 'Ich habe %d Einträge für %s gefunden. <break time="1s"/> ',
            'QUESTION_READ_MESSAGE': 'Soll ich Dir die Einträge vorlesen?',

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

const requestHandler = function(event, context, callback) {
    //console.log('event', JSON.stringify(event));
    //console.log('context', JSON.stringify(context));
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

const handlers = {
    'LaunchRequest': function () {
        // console.log('LaunchRequest');
        this.emit('WhoIsInsolvent');
    },

    'WhoIsInsolvent': function () {
        // console.log('WhoIsInsolvent');
        insolvenz.initialise();
        insolvenz.whoIsInsolvent((insolvenzData) => {
            const speechOutput = speech.createSpeechOutput(this, insolvenzData);
            this.emit(':tellWithCard', speechOutput, this.t('SKILL_NAME'), speechOutput);
        });
    },

    'WhoIsInsolventFromDate': function () {
        // console.log('WhoIsInsolventFromDate');
        const dateFromRequest = this.event.request.intent.slots.date.value;
        const dateParts = dateFromRequest.split('-');
        const date = dateParts[2] + '.' + dateParts[1] + '.' + dateParts[0];
        insolvenz.initialise();
        insolvenz.whoIsInsolventFromDate(date, (insolvenzData) => {
            // console.log('before speechOutput');
            const speechOutput = speech.createSpeechOutput(this, dateFromRequest, insolvenzData);
            // console.log('speechOutput', speechOutput);
            this.emit(':tellWithCard', speechOutput, this.t('SKILL_NAME'), speechOutput);
        });
    },

    'IsNameInsolvent': function() {
        // console.log('IsNameInsolvent');
        const name = this.event.request.intent.slots.name.value;
        insolvenz.initialise();
        insolvenz.isNameInsolvent(name, (insolvenzData) => {
            const speechOutput = speech.createSpeechOutput(this, name, insolvenzData);
            this.emit(':tellWithCard', speechOutput, this.t('SKILL_NAME'), speechOutput);
        });
    },

    'WhoIsInsolventInTown': function () {
        // console.log('\'WhoIsInsolventInTown');
        const town = this.event.request.intent.slots.town.value;
        insolvenz.initialise();
        insolvenz.whoIsInsolventInTown(town, (insolvenzData) => {
            const speechOutput = speech.createSpeechOutput(this, town, insolvenzData);
            this.emit(':tellWithCard', speechOutput, this.t('SKILL_NAME'), speechOutput);
        });
    },

    'AMAZON.HelpIntent': function () {
        this.emit(':ask', this.t(HELP_MESSAGE), this.t(HELP_REPROMPT));
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t(STOP_MESSAGE));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t(STOP_MESSAGE));
    },
    'Unhandled': function() {
        this.emit(':ask',
            'Entschuldigung, ich habe Dich nicht verstanden.',
            'Kannst Du das nochmal wiederholen?');
    }
};


exports.handler = requestHandler;