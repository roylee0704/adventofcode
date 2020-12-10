import fs from 'fs';

function part2(nums) {
    nums.push(0);
    nums.push(Math.max(...nums) + 3);
    nums.sort((a, b) => a - b);

    let prev = 0, i = 0;
    const adapters = {}; // adjacency list
    while (i < nums.length) {
        let x = i;
        while ((nums[x] - prev) <= 3) {
            adapters[prev] = [nums[x++], ...[...adapters[prev] || []]]
        }
        prev = nums[i++];
    }

    const memo = nums.reverse().slice(1).reduce((memo, num) => {
        memo[num] = adapters[num].reduce((accum, i) => accum + (memo[i] >= 0 ? memo[i] : 0), 0);
        return memo;
    }, { [Math.max(...nums)]: 1 });

    return memo[0];
}

function part1(nums) {
    nums.push(0);
    nums.push(Math.max(...nums) + 3);
    const [_, ones, threes] = nums.sort((a, b) => a - b).reduce(([prev, ones, threes], num) => [num, ones += +((num - prev) === 1), threes += +((num - prev) === 3)], [0, 0, 0])
    return ones * threes;
}


const nums = fs.readFileSync('./input.txt', 'utf-8').split('\n');

console.log('part1:', part1(nums));
console.time("runtime(part2)");
console.log('part2:', part2(nums));
console.timeEnd("runtime(part2)");

