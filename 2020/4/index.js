import fs from 'fs';

function solve(passports) {
    const mapper = {
        byr: 2,
        iyr: 3,
        eyr: 5,
        hgt: 7,
        hcl: 11,
        ecl: 13,
        pid: 17,
    }

    let ans = 0;

    for (const passport of passports) {

        const lines = passport.split('\n');
        let sum = 0;
        for (const line of lines) {
            const kvpairs = line.split(' ');
            for (const kvpair of kvpairs) {

                const [k, v] = kvpair.split(':');
                if (!mapper[k]) {
                    continue;
                }

                if (k === 'byr' && +v >= 1920 && +v <= 2002) {
                    sum += mapper[k];
                }
                if (k === 'iyr' && +v >= 2010 && +v <= 2020) {
                    sum += mapper[k];
                }
                if (k === 'eyr' && +v >= 2020 && +v <= 2030) {
                    sum += mapper[k];
                }
                if (k === 'hgt' && v.slice(-2) === 'cm' && +(v.slice(0, -2)) >= 150 && +(v.slice(0, -2)) <= 193) {
                    sum += mapper[k];
                }
                if (k === 'hgt' && v.slice(-2) === 'in' && +(v.slice(0, -2)) >= 59 && +(v.slice(0, -2)) <= 76) {
                    sum += mapper[k];
                }
                if (k === 'ecl' && 'amb blu brn gry grn hzl oth'.split(' ').includes(v)) {
                    sum += mapper[k];
                }
                if (k === 'hcl' && v[0] === '#' && v.length === 7) {
                    const p = new RegExp(/[0-9A-Fa-f]{6}/g);
                    if (!!v.slice(1).match(p)) {
                        sum += mapper[k];
                    }
                }
                if (k === 'pid' && v.split('').filter(c => +c >= 0 && +c <= 9).length === 9) {
                    sum += mapper[k];
                }
            }
        }

        if (sum === 58) {
            ans++;
        }

    }




    return ans;
}

const lines = fs.readFileSync('./input.txt', 'utf8');


const passports = lines.split('\n\n');

console.log('part 2:', solve(passports));