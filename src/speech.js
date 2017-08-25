exports = Object.assign(exports, { createSpeechOutput });

function createSpeechOutput(handlers, insolvenzData) {
    if (!insolvenzData || insolvenzData.length === 0) {
        return handlers.t('NOT_FOUND_MESSAGE');
    }
    let speechOutput = handlers.t('FOUND_MESSAGE', { postProcess: 'sprintf', sprintf: [insolvenzData.length]});
    insolvenzData.forEach(data => {
        const type = data.type;
        speechOutput += insolvenzDataMethods[type](handlers, data);
        speechOutput += '<break time="1s"/>'
    });

    speechOutput += handlers.t('EXTRO_MESSAGE');
    return speechOutput;
}

const insolvenzDataMethods = {
    'person': createSpeechOutputForPerson,
    'firm': createSpeechOutputForFirm,
    '?': createSpeechOutputForUnknown
};

function createSpeechOutputForPerson(handlers, data) {
    return handlers.t('PERSON_MESSAGE') + data.name + '<break time="500ms"/>' +
        handlers.t('TOWN_MESSAGE') + data.town + '<break time="500ms"/>' +
        handlers.t('TREATMENT_MESSAGE') + data.treatment + '<break time="500ms"/>';
}

function createSpeechOutputForFirm(handlers, data) {
    return handlers.t('FIRM_MESSAGE') + data.name + '<break time="500ms"/>' +
        handlers.t('REGISTER_MESSAGE') + data.register + '<break time="500ms"/>' +
        handlers.t('TOWN_MESSAGE') + data.town + '<break time="500ms"/>' +
        handlers.t('TREATMENT_MESSAGE') + data.treatment + '<break time="500ms"/>' +
        handlers.t('COURT_MESSAGE') + data.court + '<break time="500ms"/>';
}

function createSpeechOutputForUnknown(handlers, data) {
    return handlers.t('ENTRY_MESSAGE') + data.all + '<break time="500ms"/>';
}


