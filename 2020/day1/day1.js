import fs from 'fs';






// O(nlogn) time, O(1) space
function solve(nums, target) {
    nums.sort((a, b) => +a - +b);

    let lo = 0;
    let hi = nums.length - 1;
    while (lo < hi) {
        const sum = (+nums[lo]) + (+nums[hi]);
        if (+sum === +target) {
            return +nums[lo] * +nums[hi];
        } else if (sum > target) {
            hi--;
        } else {
            lo++;
        }
    }
    return -1;
}



const input = fs.readFileSync('./input.txt', 'utf8');
const lines = input.split('\n');
const target = lines[0]
const nums = lines.slice(1);

const answer = solve(nums, target);
console.log('answer:', answer)

