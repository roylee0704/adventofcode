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

    nums.reverse();
    nums.push(0);
    const memo = nums.slice(1).reduce((memo, num) => {
        memo[num] = chain[num].reduce((accum, i) => accum + (memo[i] >= 0 ? memo[i] : 0), 0);
        return memo;
    }, { [Math.max(...nums)]: 1 });

    return memo[0];
}

function part1(nums) {
    const [_, ones, threes] = nums.sort((a, b) => a - b).reduce(([prev, ones, threes], num) => {
        return [num, ones += +(num - prev === 1), threes += +(num - prev === 3)];
    }, [0, 0, 0])
    return ones * (threes + 1);
}


const nums = fs.readFileSync('./input.txt', 'utf-8').split('\n');

console.log('part1:', part1(nums));
console.time("runtime(part2)");
console.log('part2:', part2(nums));
console.timeEnd("runtime(part2)");

