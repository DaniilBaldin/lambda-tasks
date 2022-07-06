const costCalc = require('../controllers/costCalc');

describe('Testing Cost Calculator', () => {
    test('testing', () => {
        expect(
            costCalc({
                language: 'en',
                mimetype: 'doc',
                count: 100,
            })
        ).toBe(120);
    });
    test('testing', () => {
        expect(
            costCalc({
                language: 'rus',
                mimetype: 'doc',
                count: 100,
            })
        ).toBe(50);
    });
    test('testing', () => {
        expect(
            costCalc({
                language: 'ukr',
                mimetype: 'doc',
                count: 100,
            })
        ).toBe(50);
    });
    test('testing', () => {
        expect(
            costCalc({
                language: 'en',
                mimetype: 'doc',
                count: 100,
            })
        ).toBe(120);
    });
    test('testing', () => {
        expect(
            costCalc({
                language: 'en',
                mimetype: 'docx',
                count: 100,
            })
        ).toBe(120);
    });
    test('testing', () => {
        expect(
            costCalc({
                language: 'en',
                mimetype: 'rtf',
                count: 100,
            })
        ).toBe(120);
    });
    test('testing', () => {
        expect(
            costCalc({
                language: 'en',
                mimetype: 'other',
                count: 100,
            })
        ).toBe(144);
    });
    test('testing', () => {
        expect(
            costCalc({
                language: 'en',
                mimetype: 'doc',
                count: 10,
            })
        ).toBe(120);
    });
    test('testing', () => {
        expect(
            costCalc({
                language: 'en',
                mimetype: 'doc',
                count: 1000,
            })
        ).toBe(120);
    });
    test('testing', () => {
        expect(
            costCalc({
                language: 'en',
                mimetype: 'doc',
                count: 10000,
            })
        ).toBe(1200);
    });
    test('testing', () => {
        expect(
            costCalc({
                language: 'en',
                mimetype: 'doc',
                count: 20000,
            })
        ).toBe(2400);
    });
    test('testing', () => {
        expect(
            costCalc({
                language: 'ukr',
                mimetype: 'doc',
                count: 1000,
            })
        ).toBe(50);
    });
    test('testing', () => {
        expect(
            costCalc({
                language: 'ukr',
                mimetype: 'rtf',
                count: 10000,
            })
        ).toBe(500);
    });
    test('testing', () => {
        expect(
            costCalc({
                language: 'ukr',
                mimetype: 'other',
                count: 10000,
            })
        ).toBe(600);
    });
    test('testing', () => {
        expect(
            costCalc({
                language: 'rus',
                mimetype: 'other',
                count: 10000,
            })
        ).toBe(600);
    });
    test('testing', () => {
        expect(
            costCalc({
                language: 'rus',
                mimetype: 'none',
                count: 10000,
            })
        ).toBe('Please select extension of the file');
    });
    test('testing', () => {
        expect(
            costCalc({
                language: 'ukr',
                mimetype: 'none',
                count: 10000,
            })
        ).toBe('Please select extension of the file');
    });
    test('testing', () => {
        expect(
            costCalc({
                language: 'en',
                mimetype: 'none',
                count: 10000,
            })
        ).toBe('Please select extension of the file');
    });
});
