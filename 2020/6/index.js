import fs from 'fs';

function solve(groups) {


    let sum = 0;
    for (const group of groups) {

        const peoples = group.split('\n');
        const ques = {};


        for (const p of peoples) {
            for (const q of p.split('')) {
                if (!ques[q]) {
                    ques[q] = 0;
                }
                ques[q] += 1;

            }
        }

        Object.keys(ques).forEach(key => {

            console.log(key)
            console.log(ques[key])
            if (+ques[key] === peoples.length) {
                sum += 1;
            }
        })

        // console.log(Object.keys(ques), peoples.length);
        // sum += Object.keys(ques).length;

    }


    return sum;
}

const input = fs.readFileSync('./input.txt', 'utf8');

const groups = input.split('\n\n');

console.log('part 1:', solve(groups));
