const {expect} = require('chai');

const insolvenz = require('../src/insolvenz');

describe('ask insolvenz', () => {

    const testDataInsolvenz = [
        {
            type: 'person',
            name: 'Berthold Konzelmann',
            town: 'Jülich',
            treatment: '92 IK 219/11'
        },
        {
            type: 'person',
            name: 'Jülicher Straße 6 a Wolfgang Podolski',
            town: '13357 Berlin',
            treatment: '39 IK 53/12'
        },
        {
            type: 'person',
            name: 'Manuela Krieg',
            town: 'Jülich',
            treatment: '92 IN 83/11'
        },
        {
            type: 'person',
            name: 'Zeljko Barisic-Jaman',
            town: 'Jülich',
            treatment: '93 IN 101/15'
        },
        {
            type: 'person',
            name: 'Zeljko Barisic-Jaman',
            town: 'Jülich',
            treatment: '93 IN 101/15'
        },
        {
            type: 'person',
            name: 'Daniela Lövenich',
            town: 'Jülich',
            treatment: '91 IK 308/11'
        },
        {
            type: 'person',
            name: 'Daniela Lövenich',
            town: 'Jülich',
            treatment: '91 IK 308/11'
        },
        {
            type: 'person',
            name: 'Helene Kurth',
            town: 'Jülich',
            treatment: '92 IK 31/17'
        },
        {
            type: 'person',
            name: 'Helene Kurth',
            town: 'Jülich',
            treatment: '92 IK 31/17'
        },
        {
            type: 'person',
            name: 'Helene Kurth',
            town: 'Jülich',
            treatment: '92 IK 31/17'
        },
        {
            type: 'person',
            name: 'Karina Maria Katharina Krieger',
            town: 'Jülich',
            treatment: '91 IK 52/17'
        },
        {
            type: 'person',
            name: 'Karina Maria Katharina Krieger',
            town: 'Jülich',
            treatment: '91 IK 52/17'
        },
        {
            type: 'person',
            name: 'Karina Maria Katharina Krieger',
            town: 'Jülich',
            treatment: '91 IK 52/17'
        },
        {
            type: 'person',
            name: 'Paul Lövenich',
            town: 'Jülich',
            treatment: '92 IK 238/11'
        },
        {
            type: 'person',
            name: 'Paul Lövenich',
            town: 'Jülich',
            treatment: '92 IK 238/11'
        },
        {
            type: 'person',
            name: 'Waldemar Meisinger',
            town: 'Jülich',
            treatment: '93 IN 155/17'
        },
        {
            type: 'person',
            name: 'Waldemar Meisinger',
            town: 'Jülich',
            treatment: '93 IN 155/17'
        },
        {
            type: 'person',
            name: 'Dirk Schleicher',
            town: 'Jülich',
            treatment: '93 IK 260/17'
        },
        {
            type: 'person',
            name: 'Dirk Schleicher',
            town: 'Jülich',
            treatment: '93 IK 260/17'
        },
        {
            type: 'person',
            name: 'Dirk Koglin',
            town: 'Jülich',
            treatment: '93 IK 269/16'
        },
        {
            type: 'person',
            name: 'Friedrich Konradi',
            town: 'Jülich',
            treatment: '93 IN 142/14'
        },
        {
            type: 'person',
            name: 'Josef Lammertz',
            town: 'Jülich',
            treatment: '91 IK 201/16'
        },
        {
            type: 'person',
            name: 'Josef Lammertz',
            town: 'Jülich',
            treatment: '91 IK 201/16'
        },
        {
            type: 'person',
            name: 'Josef Lammertz',
            town: 'Jülich',
            treatment: '91 IK 201/16'
        },
        {
            type: 'person',
            name: 'Murat Tosun',
            town: 'Jülich',
            treatment: '91 IK 495/16'
        }
    ];


    before((done) => {
        "use strict";
        // without parameter to test live system and get some data
        insolvenz.initialise('./test/data/insolventInJuelich.html');
        done();
    });

    it('who is actual insolvent', (done) => {
        insolvenz.whoIsInsolvent((insolvenzData) => {
            "use strict";
            expect(insolvenzData).to.deep.equal(testDataInsolvenz);
            done();
        });
    });

    it('is <name> insolvent', (done) => {
        const name = 'Bittmann';
        insolvenz.isNameInsolvent(name, (insolvenzData) => {
            expect(insolvenzData).to.deep.equal(testDataInsolvenz);
            done();
        });
    });

    it('is insolvent from <date>', (done) => {
        const date = '19.08.2017';
        insolvenz.whoIsInsolventFromDate(date, (insolvenzData) => {
            expect(insolvenzData).to.deep.equal(testDataInsolvenz);
            done();
        });
    });

});