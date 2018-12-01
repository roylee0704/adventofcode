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
	fmt.Println("part1:", p.FindSum())
	fmt.Println("part2:", p.FindDuplicatedFrequency())
}

type problem struct {
	freq  map[int]bool
	input io.ReadSeeker
	sum   int
}

func newProblem(input io.ReadSeeker) *problem {
	return &problem{
		input: input,
		freq:  make(map[int]bool),
	}
}

func (p *problem) FindSum() int {
	p.reset()
	p.input.Seek(0, 0)
	s := bufio.NewScanner(p.input)
	for s.Scan() {
		i := 0
		fmt.Sscanf(s.Text(), "%d", &i)
		p.sum += i
	}
	return p.sum
}

func (p *problem) FindDuplicatedFrequency() int {
	p.reset()
	for {
		p.input.Seek(0, 0)
		s := bufio.NewScanner(p.input)
		for s.Scan() {
			i := 0
			fmt.Sscanf(s.Text(), "%d", &i)
			p.sum += i
			if p.freq[p.sum] {
				return p.sum
			}
			p.freq[p.sum] = true
		}
	}
}

func (p *problem) reset() {
	p.sum = 0
	p.freq = make(map[int]bool)
}
