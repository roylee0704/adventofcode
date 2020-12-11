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
                    // comment: part1
                    // if (
                    //     0 <= row + dx && row + dx < grid.length &&
                    //     0 <= col + dy && col + dy < grid[0].length
                    // ) {
                    //     adj.push(grid[row + dx][col + dy]);
                    // }


                    // part2
                    let i = 1;
                    while (
                        0 <= row + i * dx && row + i * dx < grid.length &&
                        0 <= col + i * dy && col + i * dy < grid[0].length
                    ) {
                        let ch = grid[row + i * dx][col + i * dy];
                        if (ch != '.') {
                            if (ch === '#') {
                                adj.push(ch);
                            }
                            break;
                        }
                        i++
                    }
                }
            }

            if (grid[row][col] === 'L' && !adj.includes('#')) {
                newRow += '#';
            }

            // comment: part1
            // else if (grid[row][col] === '#' && adj.filter(ch => ch === '#').length >= 4) {
            //     newRow += 'L';
            // }
            else if (grid[row][col] === '#' && adj.filter(ch => ch === '#').length >= 5) {
                newRow += 'L';
            }

            else {
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
    if (nextGrid.join('') === grid.join('')) {
        console.log(nextGrid.join('').split('').filter(rc => rc === '#').length)
        break;
    }

    grid = nextGrid;
}