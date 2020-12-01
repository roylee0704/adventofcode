import fs from 'fs';

// O(nlogn) time, O(1) space
function solve2Sums(nums, target) {
    nums.sort((a, b) => a - b);

    let lo = 0;
    let hi = nums.length - 1;
    while (lo < hi) {
        const sum = nums[lo] + nums[hi];
        if (+sum === target) {
            return nums[lo] * nums[hi];
        } else if (sum > target) {
            hi--;
        } else {
            lo++;
        }
    }
    return -1;
}

function solve3Sums(nums, target) {
    nums.sort((a, b) => a - b);



    for (let i = 0; i < nums.length - 2; i++) {

        const num1 = nums[i];
        let lo = i + 1;
        let hi = nums.length - 1;
        while (lo < hi) {
            const num2 = nums[lo];
            const num3 = nums[hi];

            const sum = num1 + num2 + num3;
            if (+sum === target) {
                return num1 * num2 * num3;
            } else if (sum > target) {
                hi--;
            } else {
                lo++;
            }
        }

    }



    return -1;
}



const input = fs.readFileSync('./input.txt', 'utf8');
const nums = input.split('\n');
const target = 2020;
const part1 = solve2Sums(nums.map(num => +num), target);
console.log('part1:', part1)

const part2 = solve3Sums(nums.map(num => +num), target);
console.log('part2:', part2)
