import fs from 'fs';


function solve(matrix, dy, dx) {
    const [n, m] = [matrix[0].length, matrix.length];
    let x = 0, y = 0, ans = 1, curr = 0;
    while (x < m) {
        curr += +(matrix[x][y] === '#');
        x += dx;
        y += dy;
        y %= n;
    }
    ans *= curr;
    return ans;
}

const fin = fs.readFileSync('./input.txt', 'utf8');
const matrix = [...fin.split('\n').filter(line => line.trim())]
console.log('part 1:', solve(matrix, 3, 1));

const a = solve(matrix, 1, 1);
const b = solve(matrix, 3, 1);
const c = solve(matrix, 5, 1);
const d = solve(matrix, 7, 1);
const e = solve(matrix, 1, 2);

console.log('part 2:', a * b * c * d * e)
