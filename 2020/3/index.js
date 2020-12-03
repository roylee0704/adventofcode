import fs from 'fs';


function solve(matrix, right, down) {
    const maxCol = matrix[0].length;
    const maxRow = matrix.length;
    let row = 0, col = 0, trees = 0;
    while (row < maxRow - 1) {
        col += right;
        row += down;
        const obj = matrix[row][col % maxCol];
        if (obj === '#') {
            trees++;
        }
    }
    return trees;
}

const input = fs.readFileSync('./input.txt', 'utf8');
const inputs = input.split('\n');
const matrix = [];
inputs.forEach(row => {
    matrix.push(row.split(''))
});

console.log('part 1:', solve(matrix, 3, 1));

const a = solve(matrix, 1, 1);
const b = solve(matrix, 3, 1);
const c = solve(matrix, 5, 1);
const d = solve(matrix, 7, 1);
const e = solve(matrix, 1, 2);

console.log('part 2:', a * b * c * d * e)
