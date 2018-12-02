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
	input io.ReadSeeker
	words []string
}

func newProblem(input io.ReadSeeker) *problem {
	s := bufio.NewScanner(input)
	var words []string
	for s.Scan() {
		words = append(words, s.Text())
	}
	return &problem{
		input: input,
		words: words,
	}
}

func (p *problem) FindCheckSum() int {
	var twos int
	var threes int
	for _, word := range p.words {
		charFreq := make(map[int]int)
		for _, c := range word {
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
