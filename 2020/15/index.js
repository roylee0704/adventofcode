import fs from 'fs';

function solve(lines) {
    const spoken = {};
    let last = 0;
    let turn = 0;
    for (let i = 0; i < lines.length; i++) {
        spoken[lines[i]] = [i + 1];
        last = lines[i];
        turn++;
    }

    while (turn++ < 30000000) {
        last = spoken[last]?.length >= 2 ?
            spoken[last][spoken[last].length - 1] - spoken[last][spoken[last].length - 2] :
            0;
        if (!spoken[last]) {
            spoken[last] = [];
        }

        spoken[last].push(turn);

        if (turn % 1000000 === 0) {
            console.log(`speak (${turn}):`, last)
        }
    }
    console.log('last spoken:', last)
}

let lines = fs.readFileSync('./input.txt', 'utf-8').split(',');
solve(lines);
