package main

import (
	"bufio"
	"fmt"
	"io"
	"log"
	"os"
)

func main() {
	f, err := os.Open("input.txt")
	defer f.Close()
	if err != nil {
		log.Fatal(err)
	}

	p := newProblem(f)
	fmt.Println(p.FindSum())
	fmt.Println(p.FindDuplicatedFrequency())
}

type problem struct {
	nums []int
}

func newProblem(r io.Reader) *problem {
	var nums []int
	s := bufio.NewScanner(r)
	for s.Scan() {
		num := 0
		fmt.Sscanf(s.Text(), "%d", &num)
		nums = append(nums, num)
	}
	return &problem{
		nums: nums,
	}
}

func (p *problem) FindSum() int {
	sum := 0
	for _, num := range p.nums {
		sum += num
	}
	return sum
}

func (p *problem) FindDuplicatedFrequency() int {
	freq := make(map[int]bool)
	accum := 0
	for {
		for _, num := range p.nums {
			accum += num
			if freq[accum] {
				return accum
			}
			freq[accum] = true
		}
	}
}
