import fs from "fs";

function part1(nums, target) {
  let max = -Infinity;

  let total = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === "") {
      if (total > max) {
        max = total;
      }
      total = 0;

      continue;
    }

    total += +nums[i];
  }

  return max;
}

function part2(nums, target) {
  let max = -Infinity;

  let totals = [0];
  let totalsCount = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === "") {
      totals[++totalsCount] = 0;
      continue;
    }

    totals[totalsCount] += +nums[i];
  }

  const sums = totals.sort((a, b) => b - a);

  return sums[0] + sums[1] + sums[2];
}

const input = fs.readFileSync("./input.txt", "utf8");
const nums = input.split("\n");
const target = 2020;

console.log(
  "part1:",
  part1(
    nums.map((num) => num),
    target
  )
);
console.log(
  "part2:",
  part2(
    nums.map((num) => num),
    target
  )
);
