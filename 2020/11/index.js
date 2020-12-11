import fs from 'fs';

function solve(grid) {
    const newGrid = [];
    for (let row = 0; row < grid.length; row++) {
        let newRow = '';
        for (let col = 0; col < grid[0].length; col++) {
            const adj = [];
            for (const dx of [0, -1, 1]) {
                for (const dy of [0, -1, 1]) {
                    if (dx === 0 && dy === 0) {
                        continue;
                    }
                    // work within the boundary
                    if (row + dx >= 0 && row + dx < grid.length && col + dy >= 0 && col + dy < grid[0].length && grid[row + dx][col + dy] === '#') {
                        adj.push('#');
                    }
                }
            }

            if (grid[row][col] === 'L' && !adj.includes('#')) {
                newRow += '#';
            }
            else if (grid[row][col] === '#' && adj.length >= 4) {
                newRow += 'L';
            } else {
                newRow += grid[row][col];
            }

        }
        newGrid.push(newRow);
    }
    return newGrid;
}

let grid = fs.readFileSync('./input.txt', 'utf-8').split('\n');
while (true) {
    const nextGrid = solve(grid);

    console.log(nextGrid.join(''), 'hehe');
    if (nextGrid.join('') === grid.join('')) {
        console.log(nextGrid.join('').split('').filter(rc => rc === '#').length)
        break;
    }

    grid = nextGrid;
}