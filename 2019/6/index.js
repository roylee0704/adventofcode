import fs from 'fs';

function solve(lines) {

    const orbits = {};          // reverse-al
    const vertices = new Set();

    for (const [_, u, v] of [...lines.matchAll(/(.+?)\)(.+)/gi)]) {
        orbits[v] = [u, ...(orbits[v] ?? [])];
        vertices.add(u);
        vertices.add(v);
    }

    function distance(u) {
        let total = 0;
        for (const v of (orbits[u] || [])) {
            total += 1 + distance(v)
        }
        return total;
    }
    let sum = 0;
    for (const u of vertices) {
        sum += distance(u);
    }
    console.log('part 1:', sum);


    function parents(start) {
        const l = [];
        for (const v of (orbits[start] || [])) {
            l.push(v);
            l.push(...parents(v));
        }
        return l;
    }

    const YOU = parents('YOU');
    const SAN = parents('SAN');

    console.log(YOU, SAN);



    let min = Infinity;
    for (let i = 0; i < YOU.length; i++) {
        for (let j = 0; j < SAN.length; j++) {
            if (YOU[i] === SAN[j] && (i + j) < min) {
                min = i + j;
                break;
            }
        }
    }
    console.log(min)


}


const lines = fs.readFileSync('./input.in', 'utf-8');
solve(lines);