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
	fmt.Println(p.CheckSum())

	// only works /w ascii
	fmt.Println(p.Common())
}

type problem struct {
	words []string
}

func newProblem(r io.Reader) *problem {
	s := bufio.NewScanner(r)
	var words []string
	for s.Scan() {
		words = append(words, s.Text())
	}
	return &problem{
		words: words,
	}
}

func (p *problem) CheckSum() int {
	twos, threes := 0, 0
	for _, word := range p.words {
		count := make(map[rune]int)
		for _, r := range word {
			count[r]++
		}
		if hasFreq(count, 2) {
			twos++
		}
		if hasFreq(count, 3) {
			threes++
		}
	}
	return twos * threes
}

func hasFreq(count map[rune]int, freq int) bool {
	for _, v := range count {
		if v == freq {
			return true
		}
	}
	return false
}

// O(k * N) instead of O(k * N^2), where k is the length of string
func (p *problem) Common() string {
	seen := make(map[string]bool)
	for _, word := range p.words {
		for i := range word {
			token := removeCharAt(i, word)
			key := fmt.Sprintf("%d-%s", i, token)
			if seen[key] {
				return token
			}
			seen[key] = true
		}
	}
	return ""
}

func removeCharAt(pos int, a string) string {
	n := len([]byte(a))
	if pos == 0 {
		return a[1:]
	}
	if pos == n-1 {
		return a[0 : n-1]
	}

	return a[:pos] + a[pos+1:]
}
