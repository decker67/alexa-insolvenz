const { expect } = require('chai');
const speech = require('../src/speech');

const mock_handlers = {
    't': key => key + ' '
};

describe('speech ', () => {

    before(() => {
        "use strict";
    });

    it('creates output for person example', () => {
        const data = [{
            "name": "Karina Maria Katharina Krieger",
            "town": "Jülich",
            "treatment": "91 IK 52/17",
            "type": "person"
        }];

        const output = speech.createSpeechOutput(mock_handlers, data);
        expect(output).to.include(data[0].name);
        expect(output).to.include(data[0].town);
        expect(output).to.include(data[0].treatment);
    });

    it('creates output for firm example', () => {
        const data = [{
            "court": "Registergericht Wittlich",
            "name": "Prolog Ofen GmbH",
            "register": "HRB 31833",
            "town": "Badem",
            "treatment": "9 IN 30/10",
            "type": "firm"
        }];

        const output = speech.createSpeechOutput(mock_handlers, data);
        expect(output).to.include(data[0].court);
        expect(output).to.include(data[0].name);
        expect(output).to.include(data[0].register);
        expect(output).to.include(data[0].town);
        expect(output).to.include(data[0].treatment);
    });

    it('creates output for unknown example', () => {
        const data = [{
            "all": "alles kann hier stehen ...",
            "type": "?"
        }];

        const output = speech.createSpeechOutput(mock_handlers, data);
        expect(output).to.include(data[0].all);
    });

});