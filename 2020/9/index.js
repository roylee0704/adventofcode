import fs from 'fs';

function part1(inputs, preamble) {
    for (let i = preamble; i < inputs.length; i++) {
        const start = i - preamble;
        const end = i;
        const target = inputs[i];
        const nums = inputs.slice(start, end);

        if (!has2sums(nums, target)) {
            return inputs[i];
        }
    }

    function has2sums(nums, target) {
        nums.sort((a, b) => a - b);
        let lo = 0, hi = nums.length - 1;
        while (lo <= hi) {
            if (target > (nums[lo] + nums[hi])) {
                lo++;
            } else if (target < (nums[lo] + nums[hi])) {
                hi--;
            } else {
                return true;
            }
        }
        return false;
    }
}

function part2(inputs, target) {
    let start = 0, curr = 2;
    let runningSum = inputs[0] + inputs[1];
    while (curr - start >= 2 && curr < inputs.length) {
        runningSum += inputs[curr];
        while (runningSum > target) {
            runningSum -= inputs[start];
            start++;
        }

        if (runningSum === target) {
            const nums = inputs.slice(start, curr + 1).sort((a, b) => a - b);
            return nums[0] + nums[nums.length - 1];
        }

        curr++;
    }
}


const lines = fs.readFileSync('./input.txt', 'utf-8').split('\n').map(line => +line);

console.log('part1:', part1(lines, 25));
console.log('part2:', part2(lines, part1(lines, 25)))