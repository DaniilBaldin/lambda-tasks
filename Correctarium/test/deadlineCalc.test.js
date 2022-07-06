const deadlineCalc = require('../controllers/deadlineCalc');

describe('Testing Deadline Calculator', () => {
    test('testing', () => {
        expect(
            deadlineCalc({
                language: 'en',
                mimetype: 'doc',
                count: 100,
                dateStart: '2022-08-24T09:45:21.599Z',
            })
        ).toBe("We don't work on holidays!");
    });
    test('testing', () => {
        expect(
            deadlineCalc({
                language: 'en',
                mimetype: 'doc',
                count: 100,
                dateStart: '2022-07-06T09:45:21.599Z',
            })
        ).toBe(1);
    });
    test('testing', () => {
        expect(
            deadlineCalc({
                language: 'en',
                mimetype: 'doc',
                count: 1000,
                dateStart: '2022-07-06T09:45:21.599Z',
            })
        ).toBe(3.5);
    });
    test('testing', () => {
        expect(
            deadlineCalc({
                language: 'en',
                mimetype: 'doc',
                count: 10000,
                dateStart: '2022-07-06T09:45:21.599Z',
            })
        ).toBe(
            'Looks like you got a serious task. Finishing it will take 30.53 working hours. Please discuss deadline with our manager.'
        );
    });
    test('testing', () => {
        expect(
            deadlineCalc({
                language: 'ukr',
                mimetype: 'doc',
                count: 100,
                dateStart: '2022-07-06T09:45:21.599Z',
            })
        ).toBe(1);
    });
    test('testing', () => {
        expect(
            deadlineCalc({
                language: 'ukr',
                mimetype: 'doc',
                count: 1000,
                dateStart: '2022-07-06T09:45:21.599Z',
            })
        ).toBe(1.25);
    });
    test('testing', () => {
        expect(
            deadlineCalc({
                language: 'ukr',
                mimetype: 'doc',
                count: 10000,
                dateStart: '2022-07-06T09:45:21.599Z',
            })
        ).toBe(
            'Looks like you got a serious task. Finishing it will take 8 working hours. Please discuss deadline with our manager.'
        );
    });
    test('testing', () => {
        expect(
            deadlineCalc({
                language: 'en',
                mimetype: 'doc',
                count: 10000,
                dateStart: '2022-07-06T09:45:21.599Z',
            })
        ).toBe(
            'Looks like you got a serious task. Finishing it will take 30.53 working hours. Please discuss deadline with our manager.'
        );
    });
    test('testing', () => {
        expect(
            deadlineCalc({
                language: 'en',
                mimetype: 'doc',
                count: 1000,
                dateStart: '2022-07-10T09:45:21.599Z',
            })
        ).toBe(
            'Today is Sunday. Time to finish task: 3.5 hours. It will be done Monday nearly at 14.'
        );
    });
    test('testing', () => {
        expect(
            deadlineCalc({
                language: 'ukr',
                mimetype: 'doc',
                count: 1000,
                dateStart: '2022-07-10T09:45:21.599Z',
            })
        ).toBe(
            'Today is Sunday. Time to finish task: 1.25 hours. It will be done Monday nearly at 11.'
        );
    });
    test('testing', () => {
        expect(
            deadlineCalc({
                language: 'en',
                mimetype: 'doc',
                count: 1000,
                dateStart: '2022-07-06T06:45:21.599Z',
            })
        ).toBe(
            'It is not working hours. Time to finish task: 3.5 hours. It will be done today nearly at 14.'
        );
    });
    test('testing', () => {
        expect(
            deadlineCalc({
                language: 'en',
                mimetype: 'doc',
                count: 1000,
                dateStart: '2022-07-06T18:45:21.599Z',
            })
        ).toBe(
            'It is not working hours. Time to finish task: 3.5 hours. It will be done tomorrow nearly at 14.'
        );
    });
});
