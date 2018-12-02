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
	fmt.Println(p.Sum())
	fmt.Println(p.DupFreq())
}

type problem struct {
	input []int
}

func newProblem(r io.Reader) *problem {
	var input []int
	s := bufio.NewScanner(r)
	for s.Scan() {
		num := 0
		fmt.Sscanf(s.Text(), "%d", &num)
		input = append(input, num)
	}
	return &problem{
		input: input,
	}
}

func (p *problem) Sum() int {
	sum := 0
	for _, num := range p.input {
		sum += num
	}
	return sum
}

func (p *problem) DupFreq() int {
	freq := make(map[int]bool)
	accum := 0
	for {
		for _, num := range p.input {
			accum += num
			if freq[accum] {
				return accum
			}
			freq[accum] = true
		}
	}
}
