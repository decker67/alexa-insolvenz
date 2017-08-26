
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

exports = Object.assign(exports, { createSpeechOutput, languageStrings } );

function createSpeechOutput(insolvenzData, requestValue) {
    if (!insolvenzData || insolvenzData.length === 0) {
        return this.t('NOT_FOUND_MESSAGE', { postProcess: 'sprintf', sprintf: [requestValue]});
    }
    let speechOutput = this.t('FOUND_MESSAGE', { postProcess: 'sprintf', sprintf: [insolvenzData.length, requestValue]});
    insolvenzData.forEach(data => {
        const type = data.type;
        speechOutput += insolvenzDataMethods[type].call(this, data);
        speechOutput += '<break time="1s"/>'
    });

    speechOutput += this.t('EXTRO_MESSAGE');
    return speechOutput;
}

const insolvenzDataMethods = {
    'person': createSpeechOutputForPerson,
    'firm': createSpeechOutputForFirm,
    '?': createSpeechOutputForUnknown
};

function createSpeechOutputForPerson(data) {
    return this.t('PERSON_MESSAGE') + data.name + '<break time="500ms"/>' +
        this.t('TOWN_MESSAGE') + data.town + '<break time="500ms"/>' +
        this.t('TREATMENT_MESSAGE') + '<say-as interpret-as="spell-out">' + data.treatment + '</say-as> <break time="500ms"/>';
}

function createSpeechOutputForFirm(data) {
    return this.t('FIRM_MESSAGE') + data.name + '<break time="500ms"/>' +
        this.t('REGISTER_MESSAGE') + '<say-as interpret-as="spell-out">' + data.register + '</say-as> <break time="500ms"/>' +
        this.t('TOWN_MESSAGE') + data.town + '<break time="500ms"/>' +
        this.t('TREATMENT_MESSAGE') + '<say-as interpret-as="spell-out">' + data.treatment + '</say-as> <break time="500ms"/>' +
        this.t('COURT_MESSAGE') + data.court + '<break time="500ms"/>';
}

function createSpeechOutputForUnknown(data) {
    return this.t('ENTRY_MESSAGE') + data.all + '<break time="500ms"/>';
}


