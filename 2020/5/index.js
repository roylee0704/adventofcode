import fs from 'fs';

function solve(instructions) {


    const matrix = [];
    const seatIDs = [];

    for (let i = 0; i < 128; i++) {
        matrix[i] = new Array(8);
    }


    let maxSeatID = -1;
    for (let i = 0; i < instructions.length; i++) {

        const updowns = instructions[i].slice(0, 7);
        const lrs = instructions[i].slice(7);

        let rStart = 0, rEnd = 127;
        let cStart = 0, cEnd = 7;

        for (const updown of updowns) {
            if (updown === 'F') {
                rEnd = Math.ceil((rStart + rEnd) / 2);
            }
            if (updown === 'B') {
                rStart = Math.ceil((rStart + rEnd) / 2);
            }
        }

        for (const updown of updowns) {
            if (updown === 'F') {
                rEnd = Math.ceil((rStart + rEnd) / 2);
            }
            if (updown === 'B') {
                rStart = Math.ceil((rStart + rEnd) / 2);
            }
        }

        for (const lr of lrs) {
            if (lr === 'L') {
                cEnd = Math.ceil((cStart + cEnd) / 2);
            }
            if (lr === 'R') {
                cStart = Math.ceil((cStart + cEnd) / 2);
            }
        }


        const row = rStart - 1;
        const col = cStart;
        matrix[row][col] = 1;



        const seatID = (row * 8) + col

        // console.log(row, col, seatID);
        seatIDs.push(seatID);
        if (seatID > maxSeatID) {
            maxSeatID = seatID;
        }


    }


    const missingSeatIDs = {};

    for (let i = 0; i < 128; i++) {
        for (let j = 0; j < 8; j++) {
            if (matrix[i][j] !== 1) {
                missingSeatIDs[(i * 8) + j] = true;
            }
        }
    }

    for (const seat of seatIDs) {

        // console.log(seat, missingSeatIDs[String(seat - 1)], missingSeatIDs[String(seat + 1)])
        if (missingSeatIDs[String(seat - 1)]) {
            console.log('minus', seat, seat - 1)
        }
        if (missingSeatIDs[String(seat + 1)]) {
            console.log('plus', seat, seat + 1)
        }

    }


    return maxSeatID;
}

const lines = fs.readFileSync('./input.txt', 'utf8');



const instructions = lines.split('\n');

console.log('part 1:', solve(instructions));
// console.log('part 2:', solve());