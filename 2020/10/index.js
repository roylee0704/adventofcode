import fs from 'fs';

function part2(nums) {
    nums.sort((a, b) => a - b);
    let prev = 0;
    let i = 0;

    const chain = {};
    while (i < nums.length) {
        let innerPrev = prev;
        let ptr = i;

        while ((nums[ptr] - prev) <= 3) {
            chain[innerPrev] = [nums[ptr++], ...[...chain[innerPrev] || []]]
        }

        prev = nums[i++];
    }

    const cache = { [Math.min(...nums)]: 1 };
    nums.reverse();
    nums.push(0);
    nums.slice(1).forEach(num => {
        cache[num] = chain[num].reduce((accum, ptr) => accum + (cache[String(ptr)] >= 0 ? cache[String(ptr)] : 0), 0);
    });

    return cache[0];
}

function part1(nums) {
    const [_, j1, j3] = nums.sort((a, b) => a - b).reduce(([prev, j1, j3], num) => {
        return [num, j1 += +(num - prev === 1), j3 += +(num - prev === 3)];
    }, [0, 0, 0])
    return j1 * (j3 + 1);
}


const nums = fs.readFileSync('./input.txt', 'utf-8').split('\n').map(line => +line);

console.log('part1:', part1(nums));
console.time("runtime(part2)");
console.log('part2:', part2(nums));
console.timeEnd("runtime(part2)");

