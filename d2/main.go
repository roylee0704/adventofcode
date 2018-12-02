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
	fmt.Println(p.FindMatchedString())

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

	var twos int
	var threes int
	for s.Scan() {
		charFreq := make(map[int]int)
		for _, c := range s.Text() {
			charFreq[int(c)]++
		}
		if hasFreq(charFreq, 2) {
			twos++
		}
		if hasFreq(charFreq, 3) {
			threes++
		}
	}
	return twos * threes
}

func hasFreq(charFreq map[int]int, freq int) bool {
	for _, v := range charFreq {
		if v == freq {
			return true
		}
	}
	return false
}

func (p *problem) FindMatchedString() string {
	p.input.Seek(0, 0)
	s := bufio.NewScanner(p.input)

	var data []string
	for s.Scan() {
		data = append(data, s.Text())
	}

	n := len(data)
	var currentIdx = 0

	for {
		if currentIdx+1 >= n {
			break
		}

		for k := currentIdx + 1; k < n; k++ {
			pos, match := distance(data[currentIdx], data[k])
			if match {
				return trimCharacter(data[currentIdx], pos)
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
