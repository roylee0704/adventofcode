
import fs from 'fs';

function solve(lines) {
    let ptr = 0;
    let reg = {};
    let played = {};
    while (ptr < lines.length) {

        const [inst, x, y] = lines[ptr].split(' ');
        let move = 1;
        if (inst === 'set') {
            reg[x] = get(y);
        }
        if (inst === 'add') {
            reg[x] = (get(y) + (reg[x] ?? 0));
        }
        if (inst === 'mul') {
            reg[x] = (get(y) * (reg[x] ?? 0));
        }
        if (inst === 'mod') {
            reg[x] = (reg[x] ?? 0) % get(y);
        }
        if (inst === 'rcv' && reg[x] !== 0 && played[x]) {

            console.log('reply', played[x], x);
            break;
        }
        if (inst === 'snd') {
            played[x] = reg[x];
        }
        if (inst === 'jgz' && reg[x] > 0) {
            move = +y;
        }
        ptr += move;
    }

    function get(x) {
        return reg[x] ?? +x;
    }
}


solve(fs.readFileSync('./input.in', 'utf-8').split('\n'));