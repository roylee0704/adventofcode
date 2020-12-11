import fs from 'fs';

function part1(seats) {
    const newSeats = seats.map(seat => seat.slice());
    for (let row = 0; row < seats.length; row++) {
        for (let col = 0; col < seats[0].length; col++) {
            if (seats[row][col] === 'L' && countAdjacents(seats, row, col, isOccupied) === 0) {
                newSeats[row][col] = '#';
            }
            if (seats[row][col] === '#' && countAdjacents(seats, row, col, isOccupied) >= 4) {
                newSeats[row][col] = 'L';
            }
        }
    }
    return newSeats;
}

function part2(seats) {
    const newSeats = seats.map(seat => seat.slice());
    for (let row = 0; row < seats.length; row++) {
        for (let col = 0; col < seats[0].length; col++) {
            if (seats[row][col] === 'L' && countAdjacents(seats, row, col, isOccupiedGreedy) === 0) {
                newSeats[row][col] = '#';
            }

            if (seats[row][col] === '#' && countAdjacents(seats, row, col, isOccupiedGreedy) >= 5) {
                newSeats[row][col] = 'L';
            }
        }
    }
    return newSeats;
}


function countAdjacents(seats, row, col, formula) {
    let count = 0;
    [-1, 0, 1].forEach(up =>
        [-1, 0, 1].forEach(down => {
            if (up !== 0 || down !== 0) {
                count += formula(seats, row, col, up, down);
            }
        })
    )
    return count;
}


function isOccupied(seats, row, col, up, down) {
    let dRow = row + up;
    let dCol = col + down;

    if (dRow < 0 || dCol < 0 || dRow >= seats.length || dCol >= seats[0].length) {
        return 0;
    }
    return seats[dRow][dCol] === '#' ? 1 : 0 ?? 0;
}

function isOccupiedGreedy(seats, row, col, up, down) {
    let dRow = row + up;
    let dCol = col + down;

    if (dRow < 0 || dCol < 0 || dRow >= seats.length || dCol >= seats[0].length) {
        return 0;
    }
    if (seats[dRow][dCol] === '#') {
        return 1;
    }
    if (seats[dRow][dCol] === 'L') {
        return 0;
    }
    return isOccupiedGreedy(seats, dRow, dCol, up, down);
}

function isEqual(m1, m2) {
    for (let i = 0; i < m1.length; i++) {
        for (let j = 0; j < m1[0].length; j++) {
            if (m1[i][j] !== m2[i][j]) {
                return false
            }
        }
    }
    return true;
}


function countOccupied(seats) {
    let sum = 0;
    for (let i = 0; i < seats.length; i++) {
        for (let j = 0; j < seats[0].length; j++) {
            if (seats[i][j] === '#') {
                sum++;
            }
        }
    }
    return sum;
}

function simulate(prog, initialState) {
    let currState = initialState;
    while (true) {
        const nextState = prog(currState);
        if (isEqual(currState, nextState)) {
            break;
        }
        currState = nextState;
    }
    return currState;
}


const lines = fs.readFileSync('./input.txt', 'utf-8').split('\n');
const initialState = lines.map(line => [...line.split('')]);

console.log('part1:', countOccupied(simulate(part1, initialState)))
console.log('part2:', countOccupied(simulate(part2, initialState)))

