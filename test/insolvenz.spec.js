const { expect } = require('chai');

const insolvenz = require('../src/insolvenz');

describe('ask insolvenz', () => {

    const testDataInsolvenz = [
        "Konzelmann, Berthold, Jülich, 92 IK 219/11",
        "Wolfgang Podolski, Jülicher Straße 6 a, 13357 Berlin, 39 IK 53/12",
        "Krieg, Manuela, Jülich, 92 IN 83/11",
        "Barisic-Jaman, Zeljko, Jülich, 93 IN 101/15",
        "Barisic-Jaman, Zeljko, Jülich, 93 IN 101/15",
        "Lövenich, Daniela, Jülich, 91 IK 308/11",
        "Lövenich, Daniela, Jülich, 91 IK 308/11",
        "Kurth, Helene, Jülich, 92 IK 31/17",
        "Kurth, Helene, Jülich, 92 IK 31/17",
        "Kurth, Helene, Jülich, 92 IK 31/17",
        "Krieger, Karina Maria Katharina, Jülich, 91 IK 52/17",
        "Krieger, Karina Maria Katharina, Jülich, 91 IK 52/17",
        "Krieger, Karina Maria Katharina, Jülich, 91 IK 52/17",
        "Lövenich, Paul, Jülich, 92 IK 238/11",
        "Lövenich, Paul, Jülich, 92 IK 238/11",
        "Meisinger, Waldemar, Jülich, 93 IN 155/17",
        "Meisinger, Waldemar, Jülich, 93 IN 155/17",
        "Schleicher, Dirk, Jülich, 93 IK 260/17",
        "Schleicher, Dirk, Jülich, 93 IK 260/17",
        "Koglin, Dirk, Jülich, 93 IK 269/16",
        "Konradi, Friedrich, Jülich, 93 IN 142/14",
        "Lammertz, Josef, Jülich, 91 IK 201/16",
        "Lammertz, Josef, Jülich, 91 IK 201/16",
        "Lammertz, Josef, Jülich, 91 IK 201/16",
        "Tosun, Murat, Jülich, 91 IK 495/16"
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