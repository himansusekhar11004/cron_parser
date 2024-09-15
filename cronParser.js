import { expression_map, ranges } from './constants.js';

export function parseCronCommand(inputCommand) {
    const cronFields = inputCommand.split(" ");
    const fieldCount = cronFields.length;
    let formattedCronString = '';
    for (let fieldIndex = 0; fieldIndex < fieldCount; fieldIndex++) {
        let fieldValue;
        if (fieldIndex === fieldCount - 1) {
            fieldValue = cronFields[fieldIndex];
        } else {
            fieldValue = parseCronField(cronFields[fieldIndex], expression_map[fieldIndex]);
        }
        formattedCronString += `${expression_map[fieldIndex].replaceAll('_', ' ').padEnd(14, ' ')} ${fieldValue}\n`;
    }
    return formattedCronString;
}

export function parseCronField(cronFieldValue, expressionType) {

    if (cronFieldValue === '*') {
        return generateCronRange(expressionType);
    }

    const rangeDelimiters = ['/', '-', ','];

    for (let delimiter of rangeDelimiters) {
        if (cronFieldValue.includes(delimiter)) {
            if (delimiter === ",") {
                const rangeParts = cronFieldValue.split(delimiter);
                let isValidRange = true;

                rangeParts.map(rangePart => { if (!validateCronRange(expressionType, rangePart)) { isValidRange = false } });
                if (isValidRange) {
                    return rangeParts.join(" ");
                } else {
                    return "Invalid Range";
                }
            }

            const [start, end] = cronFieldValue.split(delimiter);
            const step = delimiter === '/' ? +end : 1;
            return generateCronRange(expressionType, +start, delimiter === '-' ? +end : null, step);
        }
    }

    return cronFieldValue;
}

function rangeGenerator(start = 1, end, step) {
    const result = [];
    for (let current = start; current <= end; current += step) {
        result.push(current);
    }
    return result.join(' ');
}


function generateCronRange(expressionType, start = null, end = null, step = 1) {
    const isValidStartRange = validateCronRange(expressionType, start);
    const isValidEndRange = validateCronRange(expressionType, end);
    const [rangeStart, rangeEnd] = ranges[expressionType];
    const output = isValidStartRange && isValidEndRange ? rangeGenerator(start || rangeStart, end || rangeEnd, step) : 'Invalid Range';
    return output;
}

function validateCronRange(expressionType, value) {
    const [rangeStart, rangeEnd] = ranges[expressionType];
    return !value || (value >= rangeStart && value <= rangeEnd)
}


// console.log(parseCronCommand('*/15 0 1,15 * 1-7 /usr/bin/find'));

if (process.argv.length > 2) {
    const inputCommand = process.argv.slice(2).join(' ');
    console.log(parseCronCommand(inputCommand));
}