import fs from 'fs';

function getBagName(sentence) {
    return sentence.split('bag')[0].trim();
}

function getBagNames(sentence) {

    const names = [];
    for (const s of sentence.split(',')) {
        names.push(getBagName(s.trim()));
    }

    return names.filter(name => +name[0] !== 0);

}

function search(bags, bagName) {
    const parents = [];
    for (const [key, value] of Object.entries(bags)) {
        bags[key].filter(bag => {
            if (bag.includes(bagName)) {
                parents.push(key);
            }
            return bag.includes(bagName);
        });
    };
    return parents;
}



function dfs(bags, name, count) {
    const vertices = bags[name];
    if (vertices.length < 1) {
        return [1 * count, false];
    }

    console.log(`vertices from '${name}'`, vertices);

    let sum = 0;
    for (const u of vertices) {
        const [currCount, name] = [+u[0], u.slice(1).trim()];
        const [res, hasKid] = dfs(bags, name, currCount);
        sum += +res;
        if (hasKid) {
            sum += currCount;
        }
        console.log(`result from '${name}'': `, res);
        console.log('current sum:', sum)
    }

    console.log('done:', vertices);
    console.log('returning:', sum * count, sum, count)

    return [(sum * count), true];

}

function solve(rules) {

    const bags = {};
    for (let rule of rules) {
        const regex = /bags/gi;
        rule = String(rule).replace(regex, 'bag');

        rule = String(rule).replace(/and/gi, ',');
        const container = rule.split('contain')[0].trim();

        const containees = rule.split('contain')[1].trim();

        if (!bags[getBagName(container)]) {
            bags[getBagName(container)] = [];
        }
        bags[getBagName(container)].push(...getBagNames(containees))
    }


    let start = 'shiny gold';
    const childs = search(bags, start);

    const ans = [...childs];

    for (const child of childs) {
        const found = search(bags, child);
        if (found.length < 0) {
            continue;
        }
        childs.push(...found)
        ans.push(...found)
    }

    console.log(ans)
    return new Set(ans).size;
}



function solve2(rules) {

    const bags = {};
    for (let rule of rules) {
        const regex = /bags/gi;
        rule = String(rule).replace(regex, 'bag');
        rule = String(rule).replace(/and/gi, ',');
        rule = String(rule).replace(/no other/gi, '0 other');

        const container = rule.split('contain')[0].trim();

        const containees = rule.split('contain')[1].trim();

        if (!bags[getBagName(container)]) {
            bags[getBagName(container)] = [];
        }
        bags[getBagName(container)].push(...getBagNames(containees))
    }


    let start = 'shiny gold';
    console.log('graph', bags)


    const childs = dfs(bags, start, 1);
    return childs;
}





const input = fs.readFileSync('./input.txt', 'utf8');

// 
console.log('part 1:', solve(input.split('\n')));

console.log('part 2:', solve2(input.split('\n')));
