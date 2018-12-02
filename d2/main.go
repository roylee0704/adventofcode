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
	fmt.Println(p.FindCheckSum())
	fmt.Println(p.FindMacthedString())

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

func (p *problem) FindCheckSum() int {
	p.input.Seek(0, 0)
	s := bufio.NewScanner(p.input)

	var checksumPartA int
	var checksumPartB int

	for s.Scan() {
		str := s.Text()

		frequency := make(map[int]int)
		for _, c := range str {
			frequency[int(c)]++
		}

		var enteredA bool
		var enteredB bool

		for _, v := range frequency {
			if v == 2 && !enteredA {
				enteredA = true
				checksumPartA++
			}
			if v == 3 && !enteredB {
				enteredB = true
				checksumPartB++
			}
		}
	}
	return checksumPartB * checksumPartA
}

func (p *problem) FindMacthedString() string {
	p.input.Seek(0, 0)
	s := bufio.NewScanner(p.input)

	var buffer []string
	for s.Scan() {
		str := s.Text()
		buffer = append(buffer, str)
	}

	n := len(buffer)
	var currentIdx = 0

	for {
		if currentIdx+1 >= n {
			break
		}

		for k := currentIdx + 1; k < n; k++ {
			pos, match := distance(buffer[currentIdx], buffer[k])
			if match {
				return trimCharacter(buffer[currentIdx], pos)
			}
		}
		currentIdx++
	}
	return ""
}

// distance assume a and b are of same length
func distance(a, b string) (pos int, match bool) {
	if len([]rune(a)) != len([]rune(b)) {
		return -1, false
	}

	n := len([]rune(a))
	var unmatchedCount int
	var invalidPos int
	for i := 0; i < n; i++ {
		if a[i] != b[i] {
			unmatchedCount++
			invalidPos = i
		}
		if unmatchedCount > 1 {
			return -1, false
		}
	}

	return invalidPos, true
}

func trimCharacter(a string, pos int) string {
	n := len([]rune(a))
	if pos == 0 {
		return a[pos+1:]
	}
	if pos == n {
		return a[0:pos]
	}

	return a[:pos] + a[pos+1:]
}
