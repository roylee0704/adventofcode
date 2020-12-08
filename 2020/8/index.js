import fs from 'fs';

function run(program) {
    let curr = 1;
    const visited = {};
    let ans = 0;
    let line = 1;

    while (line <= Object.keys(program).length && curr <= Object.keys(program).length) {
        const [inst, seq, l] = program[curr];
        if (visited[curr]) {
            return [ans, false];
        }
        visited[curr] = true;

        if (inst === 'nop') {
            curr++;
            continue;
        }

        if (inst === 'acc') {
            ans += +seq;
            curr++;
            continue;
        }

        if (inst === 'jmp') {
            curr += +seq;
            continue;
        }
    }

    return [ans, true];
}

function parse(lines) {
    const program = {};
    let ptr = 1;
    for (const line of lines) {
        program[ptr] = [...line.split(' '), ptr];
        ptr++;
    }

    return program;
}

function part1(lines) {
    const program = parse(lines);
    return run(program)[0];
}


function part2(lines) {
    const program = parse(lines);
    const [accum, finished] = run(program);

    let modified = {};
    for (const i in program) {
        const [inst, seq, line] = program[i];

        modified = { ...program };
        if (inst === 'nop') {
            modified[i] = ['jmp', seq, line];
        } else if (inst === 'jmp') {
            modified[i] = ['nop', seq, line];
        }

        const [accum, finished] = run(modified);
        if (finished) {
            return accum;
        }
    }
}

const lines = fs.readFileSync('./input.txt', 'utf-8').split('\n');
console.log('part1:', part1(lines));
console.log('part2:', part2(lines));