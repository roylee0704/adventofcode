import fs from 'fs';


function solve(inputs) {

    let validCount = 0;
    for (let i = 0; i < inputs.length; i++) {
        const [minMax, rawLetter, password] = inputs[i].split(' ');

        const min = +minMax.split('-')[0];
        const max = +minMax.split('-')[1];
        const letter = rawLetter.split(':')[0];

        const filtered = password.split('').filter(l => l === letter)
        if (filtered.length >= min && filtered.length <= max) {
            validCount++;
        }
    }

    return validCount;
}


function solve2(inputs) {

    let validCount = 0;
    for (let i = 0; i < inputs.length; i++) {
        const [minMax, rawLetter, password] = inputs[i].split(' ');

        const min = +minMax.split('-')[0];
        const max = +minMax.split('-')[1];
        const letter = rawLetter.split(':')[0];

        console.log(min, max, letter, password);
        const passwords = password.split('');

        if (
            (
                passwords[min - 1] === letter && passwords[max - 1] !== letter
            ) ||
            (
                passwords[min - 1] !== letter && passwords[max - 1] === letter
            )
        ) {
            validCount++;
        }



    }

    return validCount;
}


const input = fs.readFileSync('./input.txt', 'utf8');
const inputs = input.split('\n');

console.log(solve(inputs));

console.log(solve2(inputs));