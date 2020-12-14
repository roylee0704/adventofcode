import fs from 'fs';

function solve1(lines) {
    let i = 0, mask = 0;
    let sums = {};
    while (i < lines.length) {
        if (lines[i].startsWith('mask')) {
            [, mask] = lines[i].match(/mask = ([0|1|X]+)/);
            i++;
            continue;
        }
        const [_, addr, val] = lines[i].match(/\[(\d+)\] = (\d+)/);
        sums[addr] = valDecoder(mask, val)
        i++;
    }

    console.log('part1:', Object.entries(sums).reduce((t, [_, sum]) => {
        return t + sum;
    }, 0))
}


function valDecoder(mask, val) {
    return mask.split('').reverse().reduce((sum, mbit, i) => {
        if (mbit === 'X') {
            return sum + (val & Math.pow(2, i));
        }
        return sum + (mbit * Math.pow(2, i));
    }, 0);
}


function addrDecoder(mask, val) {
    const xIndeces = [];
    const generator = mask.split('').reverse().reduce((str, mbit, i) => {
        const vbit = +((val & Math.pow(2, i)) === Math.pow(2, i));
        if (mbit === '0') {
            return str + vbit;
        }
        if (mbit === 'X') {
            xIndeces.push(mask.length - i - 1)
            return str + 'X';
        }
        if (mbit === '1') {
            return str + '1';
        }
    }, '').split('').reverse().join('');

    return [generator, xIndeces];
}


function solve2(lines) {
    let i = 0;
    let mask = 0;
    let mem = {};
    while (i < lines.length) {
        if (lines[i].startsWith('mask')) {
            [, mask] = lines[i].match(/mask = ([0|1|X]+)/);
            i++;
            continue;
        }

        const [_, addr, val] = lines[i].match(/\[(\d+)\] = (\d+)/);
        let [generator, xIndeces] = addrDecoder(mask, +addr);
        for (let counter = 0; counter < Math.pow(2, xIndeces.length); counter++) {
            const decodedAddr = [...Array(xIndeces.length)].reduce((pattern, _, i) => {
                pattern[xIndeces[i]] = String(+((counter & Math.pow(2, i)) === Math.pow(2, i)));
                return pattern;
            }, generator.split(''))
                .reverse().reduce((sum, nbit, i) => sum + (nbit * Math.pow(2, i)), 0);

            mem[decodedAddr] = val;
        }
        i++;
    }

    console.log('part2:', Object.entries(mem).reduce((t, [_, v]) => {
        return t + +v;
    }, 0))
}

let lines = fs.readFileSync('./input.txt', 'utf-8').split('\n');
solve1(lines);
solve2(lines);