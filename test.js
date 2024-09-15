import { expect } from 'chai';
import { parseCronField, parseCronCommand } from './cronParser.js'; // Adjust the path and extension as necessary

describe('parseCronField', function () {
    it('should handle "*" and return the full range for the expression type', function () {
        const result = parseCronField('*', 'minute');
        expect(result).to.equal('0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59');
    });

    it('should handle comma-separated values', function () {
        const result = parseCronField('1,15', 'day_of_month');
        expect(result).to.equal('1 15');
    });

    it('should handle step values', function () {
        const result = parseCronField('1/5', 'hour');
        expect(result).to.equal('1 6 11 16 21');
    });

    it('should handle ranges', function () {
        const result = parseCronField('1-5', 'month');
        expect(result).to.equal('1 2 3 4 5');
    });

    it('should handle plain values without special characters', function () {
        const result = parseCronField('7', 'day_of_week');
        expect(result).to.equal('7');
    });

    it('should return the plain expression if no special characters are found', function () {
        const result = parseCronField('7', 'day_of_week');
        expect(result).to.equal('7');
    });
});

describe('parseCronCommand', function () {
    it('should handle "*/15" for minutes correctly', function () {
        const input = '*/15 0 1,15 * 1-5 /usr/bin/find';

        // Expected output with precise spaces and newlines
        const expectedOutput = 'minute         0 15 30 45\n' +
            'hour           0\n' +
            'day of month   1 15\n' +
            'month          1 2 3 4 5 6 7 8 9 10 11 12\n' +
            'day of week    1 2 3 4 5\n' +
            'command        /usr/bin/find';

        const result = parseCronCommand(input).trim();

        expect(result).to.equal(expectedOutput.trim());
    });

    it('should handle "0 0 1 * * /bin/backup" correctly', function () {
        const input = '0 0 1 * * /bin/backup';
        const expectedOutput = 'minute         0\n' +
            'hour           0\n' +
            'day of month   1\n' +
            'month          1 2 3 4 5 6 7 8 9 10 11 12\n' +
            'day of week    1 2 3 4 5 6 7\n' +
            'command        /bin/backup';

        const result = parseCronCommand(input).trim();
        expect(result).to.equal(expectedOutput.trim());
    });

    it('should handle "5 4 * * sun /bin/run" correctly', function () {
        const input = '5 4 * * 1 /bin/run';
        const expectedOutput = 'minute         5\n' +
            'hour           4\n' +
            'day of month   1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30\n' +
            'month          1 2 3 4 5 6 7 8 9 10 11 12\n' +
            'day of week    1\n' +
            'command        /bin/run';

        const result = parseCronCommand(input).trim();
        expect(result).to.equal(expectedOutput.trim());
    });

    it('should handle "0 12 1 */2 * /usr/bin/cleanup" correctly', function () {
        const input = '0 12 1 */2 * /usr/bin/cleanup';
        const expectedOutput = 'minute         0\n' +
            'hour           12\n' +
            'day of month   1\n' +
            'month          1 3 5 7 9 11\n' +
            'day of week    1 2 3 4 5 6 7\n' +
            'command        /usr/bin/cleanup';

        const result = parseCronCommand(input).trim();
        expect(result).to.equal(expectedOutput.trim());
    });

    it('should handle "30 2 10-15 * * /usr/bin/script" correctly', function () {
        const input = '30 2 10-15 * * /usr/bin/script';
        const expectedOutput = 'minute         30\n' +
            'hour           2\n' +
            'day of month   10 11 12 13 14 15\n' +
            'month          1 2 3 4 5 6 7 8 9 10 11 12\n' +
            'day of week    1 2 3 4 5 6 7\n' +
            'command        /usr/bin/script';

        const result = parseCronCommand(input).trim();
        expect(result).to.equal(expectedOutput.trim());
    });

    it('should handle "30 2 10-45 * * /usr/bin/script" correctly', function () {
        const input = '30 2 10-45 * * /usr/bin/script';
        const expectedOutput = 'minute         30\n' +
            'hour           2\n' +
            'day of month   Invalid Range\n' +
            'month          1 2 3 4 5 6 7 8 9 10 11 12\n' +
            'day of week    1 2 3 4 5 6 7\n' +
            'command        /usr/bin/script';

        const result = parseCronCommand(input).trim();
        expect(result).to.equal(expectedOutput.trim());
    });

    it('should handle "*/5 1-3 * * 1,3,5 /usr/bin/sample" correctly', function () {
        const input = '*/5 1-3 * * 1,3,5 /usr/bin/sample';
        const expectedOutput = 'minute         0 5 10 15 20 25 30 35 40 45 50 55\n' +
            'hour           1 2 3\n' +
            'day of month   1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30\n' +
            'month          1 2 3 4 5 6 7 8 9 10 11 12\n' +
            'day of week    1 3 5\n' +
            'command        /usr/bin/sample';

        const result = parseCronCommand(input).trim();
        expect(result).to.equal(expectedOutput.trim());
    });
});