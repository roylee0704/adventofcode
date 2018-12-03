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
	fmt.Println(p.p1())
	fmt.Println(p.p2())

}

type claim struct {
	ID int
	x  int
	y  int
	w  int
	h  int
}

type problem struct {
	claims []claim
}

func newProblem(r io.Reader) *problem {
	s := bufio.NewScanner(r)

	var claims []claim
	for s.Scan() {
		id, x, y, w, h := 0, 0, 0, 0, 0
		fmt.Sscanf(s.Text(), "#%d @ %d,%d: %dx%d", &id, &x, &y, &w, &h)
		claims = append(claims, claim{
			ID: id,
			x:  x, y: y,
			w: w, h: h,
		})
	}
	return &problem{
		claims: claims,
	}
}

func (p *problem) p1() int {
	var grid [1000][1000]int
	for _, c := range p.claims {
		for i := c.x; i < (c.x + c.w); i++ {
			for j := c.y; j < (c.y + c.h); j++ {
				grid[i][j]++
			}
		}
	}

	sum := 0
	for i := 0; i < 1000; i++ {
		for j := 0; j < 1000; j++ {
			if grid[i][j] > 1 {
				sum++
			}
		}
	}
	return sum
}

func (p *problem) p2() int {

	var grid [1000][1000]int
	count := make(map[int]int)
	for _, c := range p.claims {
		count[c.ID] = c.w * c.h
		for i := c.x; i < (c.x + c.w); i++ {
			for j := c.y; j < (c.y + c.h); j++ {
				if grid[i][j] == 0 {
					grid[i][j] = c.ID
				} else {
					grid[i][j] = -1
				}
			}
		}
	}

	for _, c := range p.claims {
		area := 0
		for i := 0; i < 1000; i++ {
			for j := 0; j < 1000; j++ {
				if grid[i][j] == c.ID {
					area++
				}
			}
		}

		if area == c.w*c.h {
			return c.ID
		}
	}

	return 0
}
