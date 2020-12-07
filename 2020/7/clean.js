import fs from 'fs';

function solve(lines) {
    const containedin = {}  // reverse-adjecency-list
    const contains = {};    // adjecency-list 

    for (const line of lines) {
        const [_, color] = line.match(/(.+?) bags?/);
        for (const [_, count, innerColor] of [...line.matchAll(/(\d+) (.+?) bags?[,.]/g)]) {
            contains[color] = [[+count, innerColor], ...(contains[color] || [])];
            containedin[innerColor] = [color, ...(containedin[innerColor] || [])];
        }
    }

    // dfs(recursive): pre-order w/ reverse-adjecency-list
    const holdsgold = new Set();
    function check(color) {
        for (const c of (containedin[color] ?? [])) {
            holdsgold.add(c);
            check(c);
        }
    }
    check('shiny gold');
    console.log('part 1:', holdsgold.size)

    // dfs(recursive): post-order w/ adjecency-list
    function cost(color) {
        let total = 0;
        for (const [count, innerColor] of (contains[color] || [])) {
            total += count + count * cost(innerColor);
        }
        return total;
    }
    console.log('part 2:', cost('shiny gold'));
}

const lines = fs.readFileSync('./input.txt', 'utf-8').split('\n');
solve(lines);
