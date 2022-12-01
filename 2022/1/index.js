import fs from "fs";

function part1(nums, target) {
  return -1;
}

function part2(nums, target) {
  return -1;
}

const input = fs.readFileSync("./input.txt", "utf8");
const nums = input.split("\n");
const target = 2020;
console.log(
  "part1:",
  part1(
    nums.map((num) => +num),
    target
  )
);
console.log(
  "part2:",
  part2(
    nums.map((num) => +num),
    target
  )
);
