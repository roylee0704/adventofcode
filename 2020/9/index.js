import fs from 'fs';

function issumoftwo(nums, target) {
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

function part1(inputs, preamble) {
    for (let i = preamble; i < inputs.length; i++) {
        if (!issumoftwo(inputs.slice(i - preamble, i), inputs[i])) {
            return inputs[i];
        }
    }
}

function part2(inputs, target) {
    let start = 0, curr = 2;
    let partSum = inputs[0] + inputs[1];
    while (curr - start >= 2 && curr < inputs.length) {
        partSum += inputs[curr];
        while (partSum > target) {
            partSum -= inputs[start++];
        }
        if (partSum === target) {
            return Math.min(...inputs.slice(start, curr + 1)) + Math.max(...inputs.slice(start, curr + 1));
        }
        curr++;
    }
}


const lines = fs.readFileSync('./input.txt', 'utf-8').split('\n').map(line => +line);

console.log('part1:', part1(lines, 25));
console.log('part2:', part2(lines, part1(lines, 25)))