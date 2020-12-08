import fs from 'fs';

function part1(lines) {
    let accum = 0;
    let curr = 0;
    let seen = {};
    while (true) {
        const [inst, value] = lines[curr].split(' ');
        if (seen[curr]) {
            return accum;
        }

        seen[curr] = true;
        switch (inst) {
            case 'jmp':
                curr += +value;
                break;
            case 'acc':
                accum += +value;
                curr++;
                break;
            case 'nop':
                curr++;
                break;
        }
    }
}

function part2(lines) {
    let accum = 0;
    let curr = 0;
    let seen = {};
    while (curr < lines.length) {
        const [inst, value] = lines[curr].split(' ');
        if (seen[curr]) {
            return null;
        }

        seen[curr] = true;
        switch (inst) {
            case 'jmp':
                curr += +value;
                break;
            case 'acc':
                accum += +value;
                curr++;
                break;
            case 'nop':
                curr++;
                break;
        }
    }
    return accum;
}


const lines = fs.readFileSync('./input.txt', 'utf-8').split('\n');
console.log('part1:', part1(lines));

for (let i = 0; i < lines.length; i++) {
    const l = [...lines];
    if (lines[i].startsWith('jmp')) {
        l[i] = lines[i].replace(/jmp/, 'nop');
    }
    if (lines[i].startsWith('nop')) {
        l[i] = lines[i].replace(/nop/, 'jmp');
    }

    const accum = part2(l);
    if (accum !== null) {
        console.log('part2:', accum);
        break;
    }
}