import fs from 'fs';

function solve(lines) {
    let [x, y] = [0, 0];
    let [wx, wy] = [10, 1];

    // comment: part1 
    // let dir = 0;
    // for (const line of lines) {
    //     let [action, val] = [line[0], +line.slice(1)];
    //     if (action === 'F') {
    //         if (mod(dir, 360) === 0) {
    //             action = 'E';
    //         }
    //         if (mod(dir, 360) === 90) {
    //             action = 'S';
    //         }
    //         if (mod(dir, 360) === 180) {
    //             action = 'W';
    //         }
    //         if (mod(dir, 360) === 270) {
    //             action = 'N';
    //         }
    //     }
    //     if (action === 'N') {
    //         y += val;
    //     }
    //     if (action === 'S') {
    //         y -= val;
    //     }
    //     if (action === 'E') {
    //         x += val;
    //     }
    //     if (action === 'W') {
    //         x -= val;
    //     }
    //     if (action === 'R') {
    //         dir += val;
    //     }
    //     if (action === 'L') {
    //         dir -= val;
    //     }
    // }

    for (const line of lines) {
        let [action, val] = [line[0], +line.slice(1)];

        if (action === 'N') {
            wy += val;
        }
        if (action === 'S') {
            wy -= val;
        }
        if (action === 'E') {
            wx += val;
        }
        if (action === 'W') {
            wx -= val;
        }

        if (action === 'R') {
            while (val) {
                [wx, wy] = [wy, -wx];
                val -= 90;
            }
        }
        if (action === 'L') {
            while (val) {
                [wx, wy] = [-wy, wx];
                val -= 90;
            }
        }
        if (action === 'F') {
            x += wx * val;
            y += wy * val;
        }
    }

    console.log(Math.abs(x) + Math.abs(y));
}

const mod = (x, y) => (x % y + y) % y;
let lines = fs.readFileSync('./input.txt', 'utf-8').split('\n');
solve(lines);
